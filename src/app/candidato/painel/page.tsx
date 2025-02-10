'use client'

import { createProcesso, getAllProcessos, ProcessosProps } from "@/api/processos/api";
import { CandidatosProps, EmpresaProps, getAllUsers, HeadHunterProps, UserProps } from "@/api/users/api";
import { getAllVagas, VagasProps } from "@/api/vagas/api";
import Main from "@/layouts/candidato/layout";
import { useEffect, useState } from "react";
import './page.scss'
import Input from "@/components/input/component";
import Button from "@/components/button/component";
import Select from "@/components/select/component";
import { useModal } from "@/components/modal/context";



export default function Painel() {

  const [users, setUsers] = useState<UserProps[]>([])
  const [vagas, setVagas] = useState<VagasProps[]>([])
  const [user, setUser] = useState<UserProps>()
  const [headhunters, setHeadHunters] = useState<HeadHunterProps[]>([])
  const [candidatos, setCandidatos] = useState<CandidatosProps[]>([])
  const [empresa, setEmpresa] = useState<EmpresaProps[]>([])
  const [processos, setProcessos] = useState<ProcessosProps[]>([])
  const { showModal, hideModal } = useModal()

  //Requisição para os dados dos Usuarios
  useEffect(() => {
    fetchUsers()
    FetchVagas()
    FetchProcessos()
  }, [])

  const fetchUsers = async () => {
    const response = await getAllUsers()
    if (response) {
      setUsers(response.data.users)
      setHeadHunters(response.data.headhunters)
      setCandidatos(response.data.candidatos)
      setEmpresa(response.data.empresas)
    }
  }

  const FetchVagas = async () => {
    const response = await getAllVagas()
    if (response) {
      setVagas(response.data)
    }
  }

  const FetchProcessos = async () => {
    const response = await getAllProcessos()
    if (response) {
      setProcessos(response.data)
    }
  }


  //Consultar dados do usuario logado
  useEffect(() => {
    const userDados = sessionStorage.getItem('user')
    if (userDados) {
      setUser(JSON.parse(userDados))
    }


  }, []);




  const criarCandidatura = async (e: React.MouseEvent<HTMLButtonElement>, candidato_id: number | undefined, vaga_id: number) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('candidato_id', candidato_id?.toString() || '');
    formdata.append('vaga_id', vaga_id.toString());
    const status = "Esperando Retorno da Empresa"
    formdata.append('status', status);

    const response = await createProcesso(formdata)

    if (response) {
      if (response.status == false) {
        showModal('Erro', <p>{response.message}</p>)
      } else {
        showModal('Sucesso', <p>Candidatura Realizada com Sucesso</p>)
        FetchProcessos()
      }
    }

  }




  return (
    <Main>
      <section className="painel-candidato">
        <div className="vagas-area">
          <h1>Painel de Vagas</h1>
          <div className="search-vagas">
            <div className="busca-localizacao-div">
              <Input label="Buscar" type="text" name="buscar" />
              <Input label="Localização" type="text" name="localização" />
              <Button ButtonName="Buscar " variant="primary" type="button" />
            </div>
            <div className="filtracao-div">
              <Select label="Salario" defaultValue="selecione" name="salario">
                <option value="selecione">Salario</option>
              </Select>
              <Select label="Distancia (Km)" defaultValue="selecione" name="distancia">
                <option value="selecione">Distancia</option>
              </Select>
              <Select label="Modalidade" defaultValue="selecione" name="modalidade">
                <option value="selecione">Modalidade</option>
              </Select>
              <Select label="Nivel de Senoriedade" defaultValue="selecione" name="nivel_senoriedade">
                <option value="selecione">Nivel de Senoridade</option>
              </Select>
            </div>
          </div>
          <div className="vagas-container">
            {vagas.map((vaga) => {
              console.log(processos)
              //Verificação se o Usuario já se candidatou na vaga
              const candidato = candidatos.find(candidato => candidato.user_id === user?.id)
              const processoVaga = processos.filter(processo => processo.vaga_id === vaga.id)
              const usuarioCandidatado = processoVaga.find(processo => processo.candidato_id === candidato?.id)

              const headhunterId = headhunters.find(headhunter => headhunter.id === vaga.headhunter_id)
              const headhunterUser = users.find(user => user.id === headhunterId?.user_id)

              //Filtração para o Endereço da Empresa da vaga
              const vagaEmpresa = empresa.find(vagaEmpresa => vagaEmpresa.id === vaga.empresa_id);
              const userEmpresa = users.find(user => user.id == vagaEmpresa?.user_id);

              return (
                <div key={vaga.id} className="vaga-card">
                  <h2>{vaga.titulo}</h2>
                  <h3>{vagaEmpresa?.nome_fantasia}</h3>
                  <p><strong>Responsavel: </strong>{headhunterUser?.nome} {headhunterUser?.sobrenome}</p>
                  <p><strong>Região: </strong>{userEmpresa?.cidade} - {userEmpresa?.estado}</p>
                  <p><strong>Nivel :</strong> {vaga.nivel_senioridade}</p>
                  {vaga.tipo_salario === "valor" ? <p><strong>Salario: </strong> De R${vaga.salario_minimo} até R${vaga.salario_maximo}</p> : <p><strong>Salario: </strong>{vaga.tipo_salario}</p>}
                  <p><strong>Publicada em:</strong> {new Date(vaga.created_at).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Requisitos: </strong>{Array.isArray(vaga.competencias) ? vaga.competencias.join(', ') : vaga.competencias}</p>
                  <Button ButtonName="Exibir Descrição da Vaga" type="button" variant="secondary" onClick={() => {
                    showModal("Descrição da Vaga",
                      <p>{vaga.descricao}</p>
                    )
                  }} />
                  {usuarioCandidatado ? <span className="usuario-candidatado-message">Usuario já se candidatou nessa vaga</span> : <Button ButtonName="Enviar Curriculo" type="button" variant="primary" onClick={(e) => { criarCandidatura(e, candidato?.id, vaga.id) }} />}

                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Main>
  )
}
