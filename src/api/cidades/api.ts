export default async  function getCidades (uf: string) {
    const response =  await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const data = await response.json();
    return data
}