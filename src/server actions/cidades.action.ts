import getCidades from "@/api/cidades/api";

export default async  function getCidadesAction (uf: string) {
    const data =  await getCidades(uf)
    return data
}