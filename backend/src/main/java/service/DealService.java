package service;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import dao.BuyOptionDAO;
import dao.DealDAO;
import model.Deal;

@Path("/deal")
public class DealService {

	@DELETE
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Integer delete(@PathParam("id") String id) {
		BuyOptionDAO.deleteByDealId(id);
		return DealDAO.delete(id);
	}

	@GET
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Deal get(@PathParam("id") String id) {
		return DealDAO.get(id);
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Deal insert(Deal deal) {
		return DealDAO.insert(deal);
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Deal> list() {
		List<Deal> listOfCountries = DealDAO.list();
		return listOfCountries;
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Deal update(Deal deal) {
		return DealDAO.update(deal);
	}
}
