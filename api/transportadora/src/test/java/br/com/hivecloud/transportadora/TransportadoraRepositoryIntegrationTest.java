package br.com.hivecloud.transportadora;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.hivecloud.transportadora.repository.TransportadoraRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TransportadoraRepositoryIntegrationTest {

	@Autowired
    private TestEntityManager entityManager;
 
    @Autowired
    private TransportadoraRepository transportadoraRep;
}
