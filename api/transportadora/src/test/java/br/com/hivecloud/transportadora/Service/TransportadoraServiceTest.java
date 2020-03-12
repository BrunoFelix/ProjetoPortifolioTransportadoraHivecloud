package br.com.hivecloud.transportadora.Service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.service.TransportadoraService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TransportadoraServiceTest {
	
	@Autowired
    private TransportadoraService transportadoraService;
	
	@Test
    public void testPesquisarTransportadoraPorNomes() {
    	List<String> nomes = new ArrayList<>();
    	List<String> ufs = new ArrayList<>();
    	List<String> cidades = new ArrayList<>();
    	List<Long> modals = new ArrayList<>();
    	
    	nomes.add("Diggi cargas aereas");
    	nomes.add("Pavati e Pirula - Rodoáereo");
    	   	
    	ResponseEntity<Response> response = transportadoraService.findByParameters(nomes, ufs, cidades, modals);
    	
    	assertThat(response.getBody().getData()).isNotNull();
    }
}
