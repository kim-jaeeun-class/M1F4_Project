package DTO;

public class baewo_DTO {
  private String id;
  private String name;
  private String pw;
  private int user_level; // "0" or "1" 문자열 (DB는 NUMBER(1) 권장)

  public baewo_DTO() {}

  public baewo_DTO(String id, String name, String pw, int user_level) {
    this.id = id;
    this.name = name;
    this.pw = pw;
    this.user_level = user_level;
  }

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getPw() { return pw; }
  public void setPw(String pw) { this.pw = pw; }
  public int getLevel() { return user_level; }
  public void setLevel(int user_level) { this.user_level = user_level; }

  @Override
  public String toString() {
    return "baewo_DTO [id=" + id + ", name=" + name + ", user_level=" + user_level + "]";
  }
}
