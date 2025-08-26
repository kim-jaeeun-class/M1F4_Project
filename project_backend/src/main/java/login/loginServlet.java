package login;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import Service.baewo_service;
import DTO.baewo_DTO;

@WebServlet("/login")
public class loginServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    // 로그인 페이지로 이동
    response.sendRedirect(request.getContextPath() + "/1_main/html/3_login.html");
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {

    request.setCharacterEncoding("UTF-8");
    String id = request.getParameter("id");
    String pw = request.getParameter("pw");
    String keep = request.getParameter("keep_login"); // "1" or "0"

    baewo_service service = new baewo_service();
    baewo_DTO user = service.login(id, pw);

    response.setContentType("application/json; charset=UTF-8");
    
    
    
    

    if (user != null) {
      // 세션 처리
      HttpSession old = request.getSession(false);
      
      if (old != null) old.invalidate();         
      // 세션 고정화 방지 : 만일 다른 공격자가 특정 링크를 사용자에게 전송할때 
      // 만일 서버가 별다른 검정 없이 aaa라는 세션을 인정하게 되면
      // 사용자가 로그인할떄 세션 Id에 aaa가 붙음 , 공격자는 이미 aaa라는 세션 ID를
      // 가지고 있기 때문에 같은 세션을 이동해 로구인이 된 상태로 접근 가능
      
      HttpSession session = request.getSession(true);
      session.setAttribute("loginUser", user);

      if ("1".equals(keep)) {
        session.setMaxInactiveInterval(60 * 60 * 24 * 7); // 7일
//        session.setMaxInactiveInterval(15); // 15초 test
      }

      //level이 0일경우 관리자 페이지로 그렇지 않을경우 사용자 페이지로
      String target = "0".equals(
    		  Integer.toString(user.getLevel())) ? "/1_main/html/admin.html" : "/1_main/html/1-1_mainpage_login.html";
      String payload = "{\"ok\":true,\"redirect\":\"" + request.getContextPath() + target + "\"}";
      response.getWriter().write(payload);
    } else {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write("{\"ok\":false,\"msg\":\"아이디/비밀번호를 확인하세요.\"}");
    }

    
  }
}
