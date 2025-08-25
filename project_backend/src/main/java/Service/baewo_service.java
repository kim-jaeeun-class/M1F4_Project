package Service;

import DAO.baewo_DAO;
import DTO.baewo_DTO;

public class baewo_service {
  private final baewo_DAO baewoDAO = new baewo_DAO();

  public baewo_DTO login(String id, String pw) {
    if (id == null || id.isBlank() || pw == null || pw.isBlank()) return null;
    if (id.length() > 50 || pw.length() > 200) return null; // 테이블 스키마 기준
    return baewoDAO.findByIdAndPw(id.trim(), pw);
  }
}
