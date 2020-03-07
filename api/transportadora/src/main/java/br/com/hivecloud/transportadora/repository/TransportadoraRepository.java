package br.com.hivecloud.transportadora.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.hivecloud.transportadora.model.entity.Transportadora;

public interface TransportadoraRepository extends JpaRepository<Transportadora, Long> {

}
