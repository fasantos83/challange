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
import model.BuyOption;

@Path("/buyOption")
public class BuyOptionService {

	@DELETE
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void delete(@PathParam("id") String id) {
		BuyOptionDAO.delete(id);
	}

	@GET
	@Path("/{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public BuyOption getBuyOption(@PathParam("id") String id) {
		return BuyOptionDAO.get(id);
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<BuyOption> getBuyOptions_JSON() {
		List<BuyOption> listOfCountries = BuyOptionDAO.list();
		listOfCountries.add(new BuyOption());
		return listOfCountries;
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public BuyOption insert(BuyOption buyOption) {
		return BuyOptionDAO.insert(buyOption);
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public BuyOption updateBuyOption(BuyOption buyOption) {
		return BuyOptionDAO.update(buyOption);
	}
}
