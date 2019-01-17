package model;

import java.util.HashMap;
import java.util.Map;

public enum DealTypeEnum {

	LOCAL(1L, "local"), PRODUCT(2L, "product"), TRIP(3L, "trip");

	private static Map<Long, DealTypeEnum> map = new HashMap<Long, DealTypeEnum>();

	static {
		for (DealTypeEnum dealTypeEnum : DealTypeEnum.values()) {
			map.put(dealTypeEnum.id, dealTypeEnum);
		}
	}

	public static DealTypeEnum getById(Long id) {
		return map.get(id);
	}

	private final Long id;

	private final String description;

	DealTypeEnum(Long id, String description) {
		this.id = id;
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public Long getId() {
		return id;
	}

}
