'use client'

import Button from "@/components/button/component"
import { useModal } from "@/components/modal/context"
import { Admins } from "@/models/admins"
import { Candidatos } from "@/models/candidatos"
import { Empresas } from "@/models/empresas"
import { Estados } from "@/models/estados"
import { Headhunters } from "@/models/headhunter"
import { Processos } from "@/models/processos"
import { Usuarios } from "@/models/usuarios"
import { Vagas } from "@/models/vagas"


interface MinhasVagasListProps {
    candidatos: Candidatos[]
    vagas: Vagas[]
    processos: Processos[]
    empresas: Empresas[]
    headhunters: Headhunters[]
    usersCandidatos: Usuarios[];
    usersEmpresas: Usuarios[];
    usersHeadhunters: Usuarios[];
    admins: Admins[]
    userAdmins: Usuarios[]
    userLogged: Usuarios
}

export default function MinhasVagasList({
    processos,
    candidatos,
    empresas,
    headhunters,
    usersEmpresas,
    usersHeadhunters,
    userLogged,
    vagas,
    admins,
    userAdmins,

}: MinhasVagasListProps) {

    const { showModal } = useModal()
    const candidatoLogado = candidatos.find(candidato => candidato.user_id === userLogged.id)
    const processosExistentes = processos.filter(processo => processo.candidato_id == candidatoLogado?.id)
    const vagasExistentes = vagas.filter((vaga) => processosExistentes.some(processo => processo.vaga_id === vaga.id))


    return (
        <div className="vagas-container">
            {vagasExistentes && vagasExistentes.length > 0 ? vagasExistentes.map((vaga)=> {
                
                  //Filtração para o Endereço da Empresa da vaga
                  const vagaEmpresa = empresas.find(vagaEmpresa => vagaEmpresa.id === vaga.empresa_id)
                  const userEmpresa = usersEmpresas.find(user => user.id == vagaEmpresa?.user_id)

                                       //Tanto Admin, quanto Headhunters, podem ser responsaveis pela vaga 
                    // atraves do id da tabela headhunters e admin
                    const adminId = admins.find(admin => admin.id === vaga.admin_id)
                    const headhunterId = headhunters.find(headhunter => headhunter.id === vaga.headhunter_id)
                    const adminUser = userAdmins.find(user => user.id === adminId?.user_id)
                    const headhunterUser = usersHeadhunters.find(user => user.id === headhunterId?.user_id)

                    const processo = processos.find(p => p.vaga_id == vaga.id 
                        && p.candidato_id == candidatoLogado?.id
                    )

                  return (
                      <div key={vaga.id} className="vaga-card">
                          <h2>{vaga.titulo}</h2>
                          <h3>{vagaEmpresa?.nome_fantasia}</h3>
                          {headhunterId ? <p><strong>Responsavel: </strong>{headhunterUser?.nome} {headhunterUser?.sobrenome}</p> : null}
                          {adminId ? <p><strong>Responsavel: </strong> {adminUser?.nome} {adminUser?.sobrenome}</p> : null}
                          <p><strong>Região: </strong>{userEmpresa?.cidade} - {userEmpresa?.estado}</p>
                          <p><strong>Nivel :</strong> {vaga.nivel_senioridade}</p>
                          {vaga.tipo_salario === "valor" ? <p><strong>Salario: </strong> De R${vaga.salario_minimo} até R${vaga.salario_maximo}</p> : <p><strong>Salario: </strong>{vaga.tipo_salario}</p>}
                          <p><strong>Publicada em:</strong> {new Date(vaga.created_at).toLocaleDateString('pt-BR')} - <strong>Vence em: </strong> {new Date(vaga.data_final).toLocaleDateString('pt-BR')}</p>
                          <p><strong>Requisitos: </strong>{Array.isArray(vaga.competencias) ? vaga.competencias.join(', ') : vaga.competencias}</p>
                          <p><strong>Status da Candidatura: </strong> {processo ? processo.status : null}</p>
                          <Button ButtonName="Exibir Descrição da Vaga" type="button" variant="secondary" onClick={() => {
                              showModal("Descrição da Vaga",
                                  <p>{vaga.descricao}</p>
                              )
                          }} />
                         

                      </div>
                  )
            }) : <p>Não há vagas para exibir</p>}

        </div>
    )
}