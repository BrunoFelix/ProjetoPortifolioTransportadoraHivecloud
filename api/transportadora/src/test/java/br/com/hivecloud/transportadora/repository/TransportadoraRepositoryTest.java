package br.com.hivecloud.transportadora.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.repository.TransportadoraRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TransportadoraRepositoryTest {

	/*@Autowired
    private TestEntityManager entityManager;*/
 
    @Autowired
    private TransportadoraRepository transportadoraRep;
    
    @Test
    public void testPesquisarTransportadoraPorNomes() {
    	List<String> nomes = new ArrayList<>();
    	List<String> ufs = new ArrayList<>();
    	List<String> cidades = new ArrayList<>();
    	List<Long> modals = new ArrayList<>();
    	
    	nomes.add("Diggi cargas aereas");
    	nomes.add("Pavati e Pirula - Rodoáereo");
    	
    	List<Transportadora> listaPesquisa = transportadoraRep.findByParameters(nomes, ufs, cidades, modals);
    	
    	assertThat(listaPesquisa.size()).isEqualTo(2);
    }
    
    @Test
    public void testPesquisarTransportadoraPorUFs() {
    	List<String> nomes = new ArrayList<>();
    	List<String> ufs = new ArrayList<>();
    	List<String> cidades = new ArrayList<>();
    	List<Long> modals = new ArrayList<>();
    	
    	ufs.add("PE");
    	ufs.add("AM");
    	
    	List<Transportadora> listaPesquisa = transportadoraRep.findByParameters(nomes, ufs, cidades, modals);
    	
    	assertThat(listaPesquisa.size()).isEqualTo(2);
    }
    
    @Test
    public void testPesquisarTransportadoraPorCidade() {
    	List<String> nomes = new ArrayList<>();
    	List<String> ufs = new ArrayList<>();
    	List<String> cidades = new ArrayList<>();
    	List<Long> modals = new ArrayList<>();
    	
    	cidades.add("Recife");
    	cidades.add("Maceió");
    	
    	List<Transportadora> listaPesquisa = transportadoraRep.findByParameters(nomes, ufs, cidades, modals);
    	
    	assertThat(listaPesquisa.size()).isEqualTo(2);
    }
    
    @Test
    public void testPesquisarTodasTransportadoras() {
    	
    	List<Transportadora> listaPesquisa = transportadoraRep.findAll();
    	
    	assertThat(listaPesquisa.size()).isGreaterThan(0);
    }
    
    @Test
    public void testPesquisarTransportadorasPorId() {
    	
    	List<Transportadora> listaPesquisa = transportadoraRep.findAll();
    	
    	Transportadora transportadora = listaPesquisa.get(0);
    	
    	Optional<Transportadora> pesquisada = transportadoraRep.findById(transportadora.getId());
    	
    	assertThat(pesquisada.get()).isNotNull();
    }
   
    
    /*@Test
    public void pesquisarTransportadoraPorNome() {
    	//Inserindo o dado
    	Transportadora transportadora = new Transportadora();
    	transportadora.setEmail("teste@hotmail.com");
    	transportadora.setNome("Transportadora teste");
    	transportadora.setEmpresa("11111111111111");
    	transportadora.setTelefone("(81) 99999-9999");
    	transportadora.setCelular("(81) 99999-9999");
    	transportadora.setWhatsapp("(81) 99999-9999");
    	Modal modal = new Modal();
    	modal.setId(new Long(1));
    	transportadora.setModal(modal);
    	transportadora.setCep("54470040");
    	transportadora.setUf("PE");
    	transportadora.setCidade("Jaboatão dos guararapes");
    	transportadora.setBairro("Barra de Jangada");
    	transportadora.setRua("Rua Alvorada");
    	transportadora.setNumero("00");
    	entityManager.persist(transportadora);
    	entityManager.flush();
    	
    	List<String> nomes = new ArrayList<>();
    	List<String> ufs = new ArrayList<>();
    	List<String> cidades = new ArrayList<>();
    	List<Long> modals = new ArrayList<>();
    	
    	nomes.add(transportadora.getNome());
    	
    	List<Transportadora> listaPesquisa = transportadoraRep.findByParameters(nomes, ufs, cidades, modals);
    	
    	assertThat(listaPesquisa.size() == 1);
    	
    }*/
}
