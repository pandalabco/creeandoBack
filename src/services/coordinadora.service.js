const { XMLHttpRequest } = require('xmlhttprequest');
const { normalize, stripPrefix } = require('xml2js').processors;
const xml2js = require('xml2js');
const logger = require('../config/logger');

const cooCotizarCiudades = async (enviosData) => {
  function ajax(url) {
    return new Promise((resolve, reject) => {
      function createCORSRequest(method) {
        let xhr = new XMLHttpRequest();
        if ('withCredentials' in xhr) {
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          xhr.open(method, url, false);
        } else if (typeof XDomainRequest !== 'undefined') {
          // eslint-disable-next-line no-undef
          xhr = new XDomainRequest();
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          xhr.open(method, url);
        } else {
          // eslint-disable-next-line no-console
          logger.info('CORS not supported');
          xhr = null;
        }
        return xhr;
      }
      const str = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="https://sandbox.coordinadora.com/ags/1.5/server.php">
      <soapenv:Header/>
        <soapenv:Body>
            <ser:Cotizador_cotizar>
              <p>
                  <!--You may enter the following 11 items in any order-->
                  <nit>901441256</nit>
                  <div>00</div>
                  <cuenta>3</cuenta>
                  <producto>0</producto>
                  <origen>${enviosData.origen}</origen>
                  <destino>${enviosData.destino}</destino>
                  <valoracion>${enviosData.valoracion}</valoracion>
                  <nivel_servicio>
                    <!--Zero or more repetitions:-->
                    <item>${enviosData.nivelServicio}</item>
                  </nivel_servicio>
                  <detalle>
                    <!--Zero or more repetitions:-->
                    <item>
                        <!--You may enter the following 6 items in any order-->
                        <ubl>${enviosData.ubl}</ubl>
                        <alto>${enviosData.alto}</alto>
                        <ancho>${enviosData.ancho}</ancho>
                        <largo>${enviosData.largo}</largo>
                        <peso>${enviosData.peso}</peso>
                        <unidades>${enviosData.unidades}</unidades>
                    </item>
                    
                  </detalle>
                  <apikey>e2f2db52-6fdb-11eb-9439-0242ac130002</apikey>
                  <clave>mW4sZ1oI3fB7hP5w</clave>
              </p>
            </ser:Cotizador_cotizar>
        </soapenv:Body>
      </soapenv:Envelope>`;
      const xhr = createCORSRequest('POST');
      if (!xhr) {
        logger.info('XHR issue');
        return;
      }
      xhr.onload = async function () {
        const results = await xhr.responseText;
        xml2js.parseString(results, { mergeAttrs: true, tagNameProcessors: [stripPrefix, normalize] }, (err, result) => {
          if (err) {
            throw err;
          }
          resolve(result);
        });
      };
      xhr.onerror = reject;
      xhr.setRequestHeader('Content-Type', 'text/xml');
      xhr.send(str);
    });
  }
  const url = 'https://sandbox.coordinadora.com/ags/1.5/server.php';
  const defineres = await ajax(url);
  return defineres;
};

module.exports = { cooCotizarCiudades };
