export default class JwtHelper {

  constructor(tokenString = '') {
    this.token = tokenString;
  }

  getToken() {
    return this.token;
  }
  setToken(tokenString) {
    this.token = tokenString;
  }
  // retorna todos os dados carregados no token, em forma de objeto
  getDados() {
    if (!this.token) throw new Error('falha ao procurar dados em um token vazio');
    const partes = this.token.split('.');
    return JSON.parse(atob(partes[1]));
  }
  // retorna um dado carregado no token, a partir do seu nome
  getDado(key) {
    if (!this.token) throw new Error('falha ao procurar dados em um token vazio');
    const partes = this.token.split('.');
    const dados = JSON.parse(atob(partes[1]));
    // return dados.hasOwnProperty(key) ? dados[key] : undefined
    return dados[key];
  }
}
