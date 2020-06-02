export default class StringHelper {
  static extrairNumeros(string) {
    return string.replace(/\D/g,'');
  }
}