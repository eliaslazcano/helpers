export default class DateHelper {
  static date_BRparaSQL(date) {
    const i = date.split(/\D/);
    return i[2] + '-' + i[1] + '-' + i[0];
  }

  static date_SQLparaBR(date, caractere_separador = '/') {
    const i = date.split(/\D/);
    return i[2] + caractere_separador + i[1] + caractere_separador + i[0];
  }

  static datetime_BRparaSQL(datetime) {
    const i = datetime.split(/\D/);
    return i[2] + '-' + i[1] + '-' + i[0] + ' ' + i[3] + ':' + i[4] + ':00';
  }

  static datetime_SQLparaBR(datetime, separador_data = '/', separador_hora = ':') {
    const i = datetime.split(/\D/);
    return i[2] + separador_data + i[1] + separador_data + i[0] + ' ' + i[3] + separador_hora + i[4];
  }

  static date_BRagora() {
    const data = new Date();
    let mes = data.getMonth() + 1;
    mes = (mes < 10) ? '0' + mes : mes;
    let dia = (data.getDate() < 10) ? "0" + data.getDate() : data.getDate();
    return dia + '/' + mes + '/' + data.getFullYear();
  }

  static date_SQLagora() {
    const data = new Date();
    let mes = data.getMonth() + 1;
    mes = (mes < 10) ? '0' + mes : mes;
    let dia = (data.getDate() < 10) ? "0" + data.getDate() : data.getDate();
    return data.getFullYear() + '-' + mes + '-' + dia;
  }

  static datetime_SQLagora() {
    const data = new Date();
    let mes = data.getMonth() + 1;
    mes = (mes < 10) ? '0' + mes : mes;
    let dia = (data.getDate() < 10) ? "0" + data.getDate() : data.getDate();
    let hora = (data.getHours() < 10) ? "0" + data.getHours() : data.getHours();
    let minutos = (data.getMinutes() < 10) ? "0" + data.getMinutes() : data.getMinutes();
    let segundos = (data.getSeconds() < 10) ? "0" + data.getSeconds() : data.getSeconds();
    return data.getFullYear() + '-' + mes + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
  }
}