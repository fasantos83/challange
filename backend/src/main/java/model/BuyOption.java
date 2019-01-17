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
		return "BuyOption [id=" + id + ", title=" + title + ", normalPrice=" + normalPrice + ", salePrice=" + salePrice + ", percentageDiscount=" + percentageDiscount + ", quantityCupom="
				+ quantityCupom + ", startDate=" + startDate + ", endDate=" + endDate + "]";
	}
}
