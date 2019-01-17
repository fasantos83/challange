package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DAO {

	public static Connection getConnection() {
		String driver = "org.postgresql.Driver";
		String user = "postgres";
		String senha = "root";
		String url = "jdbc:postgresql://localhost:5432/peixe";
		Connection con = null;
		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, user, senha);
		} catch (ClassNotFoundException ex) {
			System.err.print(ex.getMessage());
		} catch (SQLException e) {
			System.err.print(e.getMessage());
		}
		return con;
	}
}
