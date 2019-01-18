package service;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import dao.BuyOptionDAO;
import model.BuyOption;

@Path("/buy_option")
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
	public BuyOption get(@PathParam("id") String id) {
		return BuyOptionDAO.get(id);
	}

	@POST
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public BuyOption insert(BuyOption buyOption) {
		return BuyOptionDAO.insert(buyOption);
	}

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<BuyOption> list() {
		return BuyOptionDAO.list();
	}

	@GET
	@Path("/list_by_deal")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<BuyOption> listByDealId(@QueryParam("id") String id) {
		return BuyOptionDAO.listByDealId(id);
	}

	@PUT
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public BuyOption update(BuyOption buyOption) {
		return BuyOptionDAO.update(buyOption);
	}
}
