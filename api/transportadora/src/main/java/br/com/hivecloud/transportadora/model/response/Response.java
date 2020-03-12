package br.com.hivecloud.transportadora.model.response;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
/**
 * Classe para ser o modelo de resposta a requisição
 * @author bruno
 *
 */
@Component
public class Response {

	
	private HttpStatus httpStatus;
	
	private String mensagem;
	
	/**
	 * Lista de erros
	 */
	private List<String> erros;
	
	/**
	 * Objeto
	 */
	private Object data;

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}

	public List<String> getErros() {
		return erros;
	}

	public void setErros(List<String> erros) {
		this.erros = erros;
	} 
}
