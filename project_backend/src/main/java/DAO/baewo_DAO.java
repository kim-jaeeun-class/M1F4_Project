package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import DTO.baewo_DTO;

public class baewo_DAO {

  private Connection getConn() throws Exception {
    Context ctx = new InitialContext();
    DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/oracle"); // ★ JNDI 이름 확인
    return ds.getConnection();
  }

  // 로그인: id + pw 일치하면 사용자 1명 반환, 아니면 null
  public baewo_DTO findByIdAndPw(String id, String pw) {
    String sql = "SELECT id, name, pw, user_level FROM app_user WHERE id = ? AND pw = ?";

    try (Connection con = getConn();
         PreparedStatement ps = con.prepareStatement(sql)) {

      ps.setString(1, id);
      ps.setString(2, pw);

      try (ResultSet rs = ps.executeQuery()) { // 문자열 인자 없이 실행
        if (rs.next()) {
          String levelStr = String.valueOf(rs.getInt("user_level"));
          return new baewo_DTO(
              rs.getString("id"),
              rs.getString("name"),
              rs.getString("pw"),
              levelStr
          );
        }
      }
    } catch (Exception e) {
      e.printStackTrace(); // 실서비스는 로깅 권장
    }
    return null;
  }


}
