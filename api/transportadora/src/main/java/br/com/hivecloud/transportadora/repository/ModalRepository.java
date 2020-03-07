package br.com.hivecloud.transportadora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.hivecloud.transportadora.model.entity.Modal;

public interface ModalRepository extends JpaRepository<Modal, Long>{

}
