package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.BuyOption;

public class BuyOptionDAO extends DAO {

	public static Integer delete(String id) {
		String sql = "DELETE FROM buy_option WHERE id = ?";
		int affectedRows = 0;
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);) {
			pstmt.setLong(1, Long.parseLong(id));

			affectedRows = pstmt.executeUpdate();
			if (affectedRows == 0) {
				throw new SQLException("Deleting buy option failed, no rows affected.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return affectedRows;
	}

	public static BuyOption get(String id) {
		String sql = "SELECT * FROM buy_option WHERE id = ?";
		BuyOption buyOption = new BuyOption();
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql);) {
			pstmt.setLong(1, Long.parseLong(id));
			try (ResultSet rs = pstmt.executeQuery();) {
				while (rs.next()) {
					buyOption = getBuyOption(rs);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return buyOption;
	}

	private static BuyOption getBuyOption(ResultSet rs) throws SQLException {
		return new BuyOption(//
				rs.getLong("id"), //
				rs.getString("title"), //
				rs.getDouble("normal_price"), //
				rs.getDouble("sale_price"), //
				rs.getDouble("percentage_discount"), //
				rs.getLong("quantity_cupom"), //
				rs.getDate("start_date"), //
				rs.getDate("end_date"), //
				rs.getLong("deal_id"));
	}

	public static BuyOption insert(BuyOption buyOption) {
		String sql = "INSERT INTO buy_option (title, normal_price, sale_price, percentage_discount, quantity_cupom, start_date, end_date, deal_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);) {
			int i = 1;
			pstmt.setString(i++, buyOption.getTitle());
			pstmt.setDouble(i++, buyOption.getNormalPrice());
			pstmt.setDouble(i++, buyOption.getSalePrice());
			pstmt.setDouble(i++, buyOption.getPercentageDiscount());
			pstmt.setLong(i++, buyOption.getQuantityCupom());
			pstmt.setTimestamp(i++, new java.sql.Timestamp(buyOption.getStartDate().getTime()));
			pstmt.setTimestamp(i++, new java.sql.Timestamp(buyOption.getEndDate().getTime()));
			pstmt.setLong(i++, buyOption.getDealId());

			int affectedRows = pstmt.executeUpdate();
			if (affectedRows == 0) {
				throw new SQLException("Creating buy option failed, no rows affected.");
			}
			try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					buyOption.setId(generatedKeys.getLong(1));
				} else {
					throw new SQLException("Creating buy option failed, no ID obtained.");
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return buyOption;
	}

	public static List<BuyOption> list() {
		String sql = "SELECT * FROM buy_option";
		List<BuyOption> list = new ArrayList<BuyOption>();
		try (Connection con = getConnection(); Statement stmt = con.createStatement(); ResultSet rs = stmt.executeQuery(sql);) {
			while (rs.next()) {
				list.add(getBuyOption(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public static List<BuyOption> listByDealId(String dealId) {
		String sql = "SELECT * FROM buy_option WHERE deal_id = ?";
		List<BuyOption> list = new ArrayList<BuyOption>();
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql)) {
			pstmt.setLong(1, Long.parseLong(dealId));

			try (ResultSet rs = pstmt.executeQuery()) {
				while (rs.next()) {
					list.add(getBuyOption(rs));
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public static BuyOption update(BuyOption buyOption) {
		String sql = "UPDATE buy_option set title = ?, normal_price = ?, sale_price = ?, percentage_discount = ?, quantity_cupom = ?, start_date = ?, end_date = ?, deal_id = ? WHERE id = ?";
		try (Connection con = getConnection(); PreparedStatement pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);) {
			int i = 1;
			pstmt.setString(i++, buyOption.getTitle());
			pstmt.setDouble(i++, buyOption.getNormalPrice());
			pstmt.setDouble(i++, buyOption.getSalePrice());
			pstmt.setDouble(i++, buyOption.getPercentageDiscount());
			pstmt.setLong(i++, buyOption.getQuantityCupom());
			pstmt.setTimestamp(i++, new java.sql.Timestamp(buyOption.getStartDate().getTime()));
			pstmt.setTimestamp(i++, new java.sql.Timestamp(buyOption.getEndDate().getTime()));
			pstmt.setLong(i++, buyOption.getDealId());
			pstmt.setLong(i++, buyOption.getId());

			int affectedRows = pstmt.executeUpdate();
			if (affectedRows == 0) {
				throw new SQLException("Updating buy option failed, no rows affected.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return buyOption;
	}

}
