'use server'
export async function getCep(cep: string) {
    const response1 = await fetch(`https://viacep.com.br/ws/${cep}/json/ `);
    const data1 = await response1.json();

    if (data1.erro) {
       return {erro: data1.erro}
    }
     const query = `${data1.logradouro},${data1.bairro},${data1.localidade}, ${data1.uf}, Brasil`
     const response2 = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
     const data2 = await response2.json();
    
    

    return {
        cep: data1.cep,
        logradouro: data1.logradouro,
        bairro: data1.bairro,
        localidade: data1.localidade,
        uf: data1.uf,
        lat: data2[0].lat,
        lon: data2[0].lon
    }
}

export async function getLagLog(logradouro: string, cidade: string, estado: string){
    const query = `${logradouro},${cidade}, ${estado}, Brasil`
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const data = await response.json();

    return data


}