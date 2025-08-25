package login;

import java.io.IOException;
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
      if (old != null) old.invalidate();          // 세션 고정화 방지
      HttpSession session = request.getSession(true);
      session.setAttribute("loginUser", user);

      if ("1".equals(keep)) {
        session.setMaxInactiveInterval(60 * 60 * 24 * 7); // 7일
      }

      String target = "0".equals(user.getLevel()) ? "/1_main/html/1-1_mainpage_login.html" : "/home.jsp";
      String payload = "{\"ok\":true,\"redirect\":\"" + request.getContextPath() + target + "\"}";
      response.getWriter().write(payload);
    } else {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write("{\"ok\":false,\"msg\":\"아이디/비밀번호를 확인하세요.\"}");
    }
  }
}
