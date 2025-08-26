package login;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import DTO.baewo_DTO;
import Service.baewo_service;

/**
 * Servlet implementation class viewall
 */
@WebServlet("/viewall")
public class viewall extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    request.setCharacterEncoding("UTF-8");

    // 로그인 체크
//    if (request.getSession(false) == null || request.getSession(false).getAttribute("loginUser") == null) {
//      response.sendRedirect(request.getContextPath() + "/1_main/html/3_login.html");
//      return;
//    }

    try {
      baewo_service service = new baewo_service();
      List<baewo_DTO> list = service.ViewAll();
      request.setAttribute("viewall", list);

      // 오직 한 번의 forward만!
      request.getRequestDispatcher("/showall.jsp").forward(request, response);
      return;

    } catch (Exception e) {
      e.printStackTrace();
        
      }
    }
  }

