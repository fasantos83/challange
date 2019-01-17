package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Deal;

public class DealDAO extends DAO {

	public static Integer delete(String id) {
		String sql = "DELETE FROM deal WHERE id = ?";
		int affectedRows = 0;
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);) {
			pstmt.setLong(1, Long.parseLong(id));

			affectedRows = pstmt.executeUpdate();
			if (affectedRows == 0) {
				throw new SQLException("Deleting deal failed, no rows affected.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return affectedRows;
	}

	public static Deal get(String id) {
		String sql = "SELECT * FROM deal WHERE id = ?";
		Deal deal = new Deal();
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql);) {
			pstmt.setLong(1, Long.parseLong(id));
			try (ResultSet rs = pstmt.executeQuery();) {
				while (rs.next()) {
					deal = getDeal(rs);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return deal;
	}

	private static Deal getDeal(ResultSet rs) throws SQLException {
		return new Deal(//
				rs.getLong("id"), //
				rs.getString("title"), //
				rs.getString("text"), //
				rs.getDate("create_date"), //
				rs.getDate("publish_date"), //
				rs.getDate("end_date"), //
				rs.getString("url"), //
				rs.getLong("total_sold"), //
				rs.getLong("deal_type_id"));
	}

	public static Deal insert(Deal deal) {
		String sql = "INSERT INTO deal (title, text, create_date, publish_date, end_date, url, total_sold, deal_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);) {
			int i = 1;
			pstmt.setString(i++, deal.getTitle());
			pstmt.setString(i++, deal.getText());
			pstmt.setTimestamp(i++, new java.sql.Timestamp(deal.getCreateDate().getTime()));
			pstmt.setTimestamp(i++, new java.sql.Timestamp(deal.getPublishDate().getTime()));
			pstmt.setTimestamp(i++, new java.sql.Timestamp(deal.getEndDate().getTime()));
			pstmt.setString(i++, deal.getUrl());
			pstmt.setLong(i++, deal.getTotalSold());
			pstmt.setLong(i++, deal.getDealTypeId());

			int affectedRows = pstmt.executeUpdate();
			if (affectedRows == 0) {
				throw new SQLException("Creating deal failed, no rows affected.");
			}
			try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					deal.setId(generatedKeys.getLong(1));
				} else {
					throw new SQLException("Creating deal failed, no ID obtained.");
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return deal;
	}

	public static List<Deal> list() {
		String sql = "SELECT * FROM deal";
		List<Deal> list = new ArrayList<Deal>();
		try (Connection con = getConnection(); Statement stmt = con.createStatement(); ResultSet rs = stmt.executeQuery(sql);) {
			while (rs.next()) {
				list.add(getDeal(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public static Deal update(Deal deal) {
		String sql = "UPDATE deal set title = ?, text = ?, create_date = ?, publish_date = ?, end_date = ?, url = ?, total_sold = ?, deal_type_id = ? WHERE id = ?";
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);) {
			int i = 1;
			pstmt.setString(i++, deal.getTitle());
			pstmt.setString(i++, deal.getText());
			pstmt.setTimestamp(i++, new java.sql.Timestamp(deal.getCreateDate().getTime()));
			pstmt.setTimestamp(i++, new java.sql.Timestamp(deal.getPublishDate().getTime()));
			pstmt.setTimestamp(i++, new java.sql.Timestamp(deal.getEndDate().getTime()));
			pstmt.setString(i++, deal.getUrl());
			pstmt.setLong(i++, deal.getTotalSold());
			pstmt.setLong(i++, deal.getDealTypeId());
			pstmt.setLong(i++, deal.getId());

			int affectedRows = pstmt.executeUpdate();
			if (affectedRows == 0) {
				throw new SQLException("Updating deal failed, no rows affected.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return deal;
	}

}
