package model;

import java.util.Date;

public class BuyOption {

	private Long id;
	private String title;
	private Double normalPrice;
	private Double salePrice;
	private Double percentageDiscount;
	private Long quantityCupom;
	private Date startDate;
	private Date endDate;
	private Long dealId;

	public BuyOption() {
		this(null, "", 0D, 0D, 0D, 0L, new Date(), new Date(), 1L);
	}

	public BuyOption(Long id, String title, Double normalPrice, Double salePrice, Double percentageDiscount, Long quantityCupom, Date startDate, Date endDate, Long dealId) {
		super();
		setId(id);
		setTitle(title);
		setNormalPrice(normalPrice);
		setSalePrice(salePrice);
		setPercentageDiscount(percentageDiscount);
		setQuantityCupom(quantityCupom);
		setStartDate(startDate);
		setEndDate(endDate);
		setDealId(dealId);
	}

	public Long getDealId() {
		return dealId;
	}

	public Date getEndDate() {
		return endDate;
	}

	public Long getId() {
		return id;
	}

	public Double getNormalPrice() {
		return normalPrice;
	}

	public Double getPercentageDiscount() {
		return percentageDiscount;
	}

	public Long getQuantityCupom() {
		return quantityCupom;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public Date getStartDate() {
		return startDate;
	}

	public String getTitle() {
		return title;
	}

	public void setDealId(Long dealId) {
		this.dealId = dealId;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNormalPrice(Double normalPrice) {
		this.normalPrice = normalPrice;
	}

	public void setPercentageDiscount(Double percentageDiscount) {
		this.percentageDiscount = percentageDiscount;
	}

	public void setQuantityCupom(Long quantityCupom) {
		this.quantityCupom = quantityCupom;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "BuyOption [id=" + getId() + ", title=" + getTitle() + ", normalPrice=" + getNormalPrice() + ", salePrice=" + getSalePrice() + ", percentageDiscount=" + getPercentageDiscount()
				+ ", quantityCupom=" + getQuantityCupom() + ", startDate=" + getStartDate() + ", endDate=" + getEndDate() + "]";
	}
}
