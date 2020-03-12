package br.com.hivecloud.transportadora.service.serviceImpl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.hivecloud.transportadora.model.entity.Transportadora;
import br.com.hivecloud.transportadora.model.entity.Uf;
import br.com.hivecloud.transportadora.model.enums.UnidadeFederativa;
import br.com.hivecloud.transportadora.model.response.Response;
import br.com.hivecloud.transportadora.repository.TransportadoraRepository;
import br.com.hivecloud.transportadora.service.TransportadoraService;

@Service
public class TransportadoraServiceImpl implements TransportadoraService {

	@Autowired
	private TransportadoraRepository transportadoraRep;
	
	private Response response;
	
	/**
	 * Metódo de inserção da transportadora
	 */
	public ResponseEntity<Response> save(Transportadora transportadora) {
		try {
			response = new Response();
			
			//Validando campos do objeto
			List<String> listaErros = validarTransportadora(transportadora);
			
			//se houver críticas retorne erro
			if (listaErros.size() > 0) {
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}
			
			response.setData(transportadoraRep.saveAndFlush(transportadora));
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	/**
	 * Metódo de alteração da transportadora
	 */
	public ResponseEntity<Response> update(Transportadora transportadora) {
		try {
			response = new Response();
			
			//Buscando transportadora pelo ID
			ResponseEntity<Response> transportadoraConsulta = findById(transportadora.getId());
			
			//Caso não exista, retornando erro
			if (transportadoraConsulta.getBody().getData() == null) {
				response.getErros().add("Código de transportadora não encontrado!.");
				return ResponseEntity.badRequest().body(response);
			}
			//Caso exista, validando campos
			List<String> listaErros = validarTransportadora(transportadora);
			if (listaErros.size() > 0) {
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}
			
			response.setData(transportadoraRep.saveAndFlush(transportadora));
			
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	/**
	 * Metódo de exclusão da transportadora
	 */
	public ResponseEntity<Response> deleteById(Long id) {
		try {
			response = new Response();
			
			//Verificando se transportadora existe pelo ID
			ResponseEntity<Response> transportadora = findById(id);
			
			//Caso não exista, retornar erro
			if (transportadora.getBody().getData() == null) {
				response.getErros().add("Código de transportadora não encontrado!.");
				return ResponseEntity.badRequest().body(response);
			}
			
			transportadoraRep.deleteById(id);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	/**
	 * Metódo de pesquisar por parametros da transportadora
	 */
	public ResponseEntity<Response> findByParameters(List<String> nomes, List<String> ufs, List<String> cidades, List<Long> modals){
		response = new Response();
		try {
			//Carregando uma lista de transportadoras filtradas por nomes, ufs, cidades e modals
			List<Transportadora> listaTransportadora = transportadoraRep.findByParameters(nomes, ufs, cidades, modals);
			
			//se a lista estiver vazia, retornar erro
			if (listaTransportadora.size() <= 0) {
				List<String> listaErros = new ArrayList<String>();
				listaErros.add("Nenhuma transportadora encontrada com os parâmetros informados!");
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}else {
				//Carregando descrição da UF no objeto
				for (Transportadora transportadora : listaTransportadora) {
					transportadora.setDescricaoUf(UnidadeFederativa.fromSigla(transportadora.getUf()).nome());
				}
			}
			
			response.setData(listaTransportadora);
			
			return ResponseEntity.ok().body(response);
			
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	/**
	 * Metódo de pesquisar todos da transportadora
	 */
	public ResponseEntity<Response> findAll(){
		response = new Response();
		try {
			//Carregando todas as transportadoras para uma lista
			List<Transportadora> listaTransportadora = transportadoraRep.findAll();
			
			//Caso não tenha nenhum item na lista, retornar erro
			if (listaTransportadora.size() <= 0) {
				List<String> listaErros = new ArrayList<String>();
				listaErros.add("Ainda não existe nenhuma transportadora cadastrada!");
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}else {
				//Carregando descrição da UF no objeto
				for (Transportadora transportadora : listaTransportadora) {
					transportadora.setDescricaoUf(UnidadeFederativa.fromSigla(transportadora.getUf()).nome());
				}
			}
			
			response.setData(listaTransportadora);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	/**
	 * Metódo de pesquisar por ID da transportadora
	 */
	public ResponseEntity<Response> findById(Long id){
		response = new Response();
		try {
			Optional<Transportadora> transportadora = transportadoraRep.findById(id);
			
			//Caso não exista nenhuma transportadora com o ID pesquisado
			if (transportadora == null || !transportadora.isPresent()) {
				List<String> listaErros = new ArrayList<String>();
				listaErros.add("Código de transportadora não encontrado!.");
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}
			response.setData(transportadora);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	/**
	 * Metódo de pesquisar todas as UFs
	 */
	public ResponseEntity<Response> findByUnidadesFederativas(){
		response = new Response();
		try {
			
			//Adicionando todas as UFs em uma lista
			List<Uf> listaUf = new ArrayList<>();
			for (UnidadeFederativa unidadeFederativa : UnidadeFederativa.values()) {
				Uf uf = new Uf();
				uf.setNome(unidadeFederativa.nome());
				uf.setSigla(unidadeFederativa.sigla());
				listaUf.add(uf);
			}
			
			//se a lista não foi carregada retornar erro
			if (listaUf.size() <= 0) {
				List<String> listaErros = new ArrayList<String>();
				listaErros.add("Ainda não existe nenhuma UF cadastrada!");
				response.setErros(listaErros);
				return ResponseEntity.badRequest().body(response);
			}
			
			response.setData(listaUf);
			
			return ResponseEntity.ok().body(response);
			
		} catch (Exception e) {
			List<String> listaErros = new ArrayList<String>();
			listaErros.add(e.getMessage());
			response.setErros(listaErros);
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	/**
	 * Metódo para realizar a validação do objeto Transportadora
	 * @param transportadora
	 * @return
	 */
	private List<String> validarTransportadora(Transportadora transportadora) {
		List<String> listaErros = new ArrayList<>();
		
		if (transportadora.getEmail() == null || transportadora.getEmail().trim().isEmpty()) {
			listaErros.add("Campo E-mail é obrigatório!");
		}else {
			String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
	        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
	        Matcher matcher = pattern.matcher(transportadora.getEmail());
	        if (!matcher.matches()) {
	        	listaErros.add("E-mail digitado é inválido!");
	        }
		}
		if (transportadora.getNome() == null || transportadora.getNome().trim().isEmpty()) {
			listaErros.add("Campo Nome é obrigatório!");
		} else {
			if (transportadora.getNome().length() < 4) {
				listaErros.add("Campo Nome não pode ter menos que 4 caracteres!");
			}
		}
		if (transportadora.getEmpresa() == null || transportadora.getEmpresa().trim().isEmpty()) {
			listaErros.add("Campo Empresa é obrigatório!");
		}
		if (transportadora.getTelefone() == null || transportadora.getTelefone().trim().isEmpty()) {
			listaErros.add("Campo Telefone é obrigatório!");
		}
		if (transportadora.getModal() == null || transportadora.getModal().getId() == null || transportadora.getModal().getId() == 0) {
			listaErros.add("Campo Modal é obrigatório!");
		}
		if (transportadora.getRua() == null || transportadora.getRua().trim().isEmpty()) {
			listaErros.add("Campo Rua é obrigatório!");
		}
		if (transportadora.getNumero() == null || transportadora.getNumero().trim().isEmpty()) {
			listaErros.add("Campo Número é obrigatório!");
		}
		if (transportadora.getBairro() == null || transportadora.getCidade().trim().isEmpty()) {
			listaErros.add("Campo Cidade é obrigatório!");
		}
		if (transportadora.getUf() == null || transportadora.getUf().trim().isEmpty()) {
			listaErros.add("Campo UF é obrigatório!");
		}else {
			if (UnidadeFederativa.fromSigla(transportadora.getUf()) == null) {
				listaErros.add("Estado inválido!");
			}
		}
		
		return listaErros;
	}
	
}
