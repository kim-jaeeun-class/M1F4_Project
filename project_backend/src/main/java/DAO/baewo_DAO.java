package DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import DTO.baewo_DTO;

public class baewo_DAO {

  private Connection getConn() throws Exception {
    Context ctx = new InitialContext();
    DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/oracle");
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
          return new baewo_DTO(
              rs.getString("id"),
              rs.getString("name"),
              rs.getString("pw"),
              rs.getInt("user_level")
              
          );
        }
        rs.close();
      }
      ps.close();
      con.close();
    
      
      
    } catch (Exception e) {
      e.printStackTrace(); // 실서비스는 로깅 권장
    }

    
    return null;
  }
  
//  public List<baewo_DTO> selectorAll() {
//	  String query = "select name, id, pw, 'Level' as level  from app_user ";
//	  List<baewo_DTO> list = new ArrayList<>();
//	  try{
//	  	Connection con = getConn();
//	  	PreparedStatement ps = con.prepareStatement(query);
//	  	ResultSet rs = ps.executeQuery();
//	  	while(rs.next()) {
//	  		baewo_DTO baeDTO = new baewo_DTO();
//
//	  		baeDTO.setId(rs.getString("id"));
//	  		baeDTO.setPw(rs.getString("pw"));
//	  		baeDTO.setName(rs.getString("name"));
//	  		baeDTO.setLevel(rs.getString("level"));
//	  		
//	  		list.add(baeDTO);
//	  		
//	  	}
//	  	
//	  	
//	  } catch(Exception e) {
//		  e.printStackTrace();
//	  }
//
//	  
//	  return list;
//	  
//  }
 
  public List<baewo_DTO> selectorAll() { // 메서드명도 selectAll로 정리 권장
	    String sql = "SELECT id, name,  pw,  user_level FROM app_user";
	    List<baewo_DTO> list = new ArrayList<>();

	    try (Connection con = getConn();
	         PreparedStatement ps = con.prepareStatement(sql);
	         ResultSet rs = ps.executeQuery()) {

	        while (rs.next()) {
	            baewo_DTO dto = new baewo_DTO();
	            dto.setId(rs.getString("id"));
	            dto.setName(rs.getString("name"));
	            dto.setPw(rs.getString("pw"));
	            dto.setLevel(rs.getInt("user_level"));

	            // 보안상 pw는 목록에 노출하지 않는 것을 권장
	            // dto.setPw(rs.getString("pw"))       

	            list.add(dto);
	        }
	        rs.close();
	        ps.close();
	        con.close();
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return list;
	}
}
