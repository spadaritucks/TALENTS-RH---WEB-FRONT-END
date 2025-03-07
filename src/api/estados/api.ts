export default async  function getEstado () {
    const response =  await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados ');
    const data = await response.json();
    return data
}



