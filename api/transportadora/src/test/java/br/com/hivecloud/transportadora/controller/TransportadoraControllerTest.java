package br.com.hivecloud.transportadora.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.hivecloud.transportadora.model.entity.Modal;
import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TransportadoraControllerTest {

	@Autowired
	public WebApplicationContext context;
	
	@Autowired
	private MockMvc mvc;
	
	@MockBean
	TransportadoraController transportadoraController;
	
	ObjectMapper mapper = new ObjectMapper();
	
	
	@Before
	public void setup() {
		this.mvc = MockMvcBuilders.webAppContextSetup(this.context).build();
	}
	
	@Test
	public void testRequisicaoFindAllSucess() throws Exception {
		String url = "/transportadora/buscarTodos/";
		this.mvc.perform(get(url)).andExpect(status().isOk());
	}
	
	@Test
	public void it_should_return_created_user() throws Exception{
		String url = "/transportadora/inserir/";
		
		Transportadora transportadora = new Transportadora();
    	transportadora.setEmail("teste@hotmail.com");
    	transportadora.setNome("Bruno Felix");
    	transportadora.setEmpresa("11111111111111");
    	transportadora.setTelefone("81999999999");
    	transportadora.setCelular("81999999999");
    	transportadora.setWhatsapp("81999999999");
    	Modal modal = new Modal();
    	modal.setId(new Long(1));
    	transportadora.setModal(modal);
    	transportadora.setCep("54470040");
    	transportadora.setUf("PE");
    	transportadora.setCidade("Jaboatão dos guararapes");
    	transportadora.setBairro("Barra de Jangada");
    	transportadora.setRua("Rua Alvorada");
    	transportadora.setNumero("00");
		ResponseEntity<Response> response = null;
		
		when(transportadoraController.save(transportadora)).thenReturn(response);
		
		this.mvc.perform(post(url).content(mapper.writeValueAsBytes(transportadora)).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.nome").value(transportadora.getNome()));
	}
	
	
}
