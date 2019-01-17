package dao;

import java.util.List;

import model.BuyOption;

public class BuyOptionDAO extends DAO {

	public static void delete(String id) {

	}

	public static BuyOption get(String id) {
		return new BuyOption();
	}

	public static BuyOption insert(BuyOption buyOption) {
		return new BuyOption();
	}

	public static List<BuyOption> list() {
		return null;
	}

	public static BuyOption update(BuyOption buyOption) {
		return buyOption;
	}

}
