package br.com.hivecloud.transportadora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.hivecloud.transportadora.model.entity.Transportadora;

public interface TransportadoraRepository extends JpaRepository<Transportadora, Long> {

	
	@Query("select t from Transportadora t where (t.nome in :nome or (trim(:nome) is null)) and (t.uf in :listUf or (trim(:listUf) is null)) and (t.cidade in :listCidade or (trim(:listCidade) is null)) and (t.modal.id in :listModal or (trim(:listModal) is null))")
	public List<Transportadora> findByParameters(@Param("nome") List<String> nomes, 
										   		 @Param("listUf") List<String> ufs,
										   		 @Param("listCidade") List<String> cidades, 
										   		 @Param("listModal") List<Long> modals);
	
	/*@Query("SELECT t.title FROM Todo t where t.id = :id") 
    String findTitleById(@Param("id") Long id);
     
    @Query("SELECT t.title FROM Todo t where t.id = :id") 
    Optional<String> findTitleById(@Param("id") Long id);*/
	
}
