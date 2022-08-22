const UsuarioList = (props) => (
    <div>
        <h4>Listagem de usuários</h4>
        <button className="btn btn-primary btn-sm" onClick={props.onClickAtualizar} type="button">Atualizar Lista</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={props.inserir}>Inserir</button>
        <table className="table">
            <thead>
                <tr>
                    {" "}
                    <th>Index</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Celular</th>
                    <th>Operações</th>
                </tr>
            </thead>
            <tbody>
                {props.usuarios.length > 0 ? (
                    props.usuarios.map((o, index) => (
                        <tr key={index}>
                            <td>{index}</td> <td>{o.nome}</td> <td>{o.email}</td>{" "}
                            <td>{o.celular}</td>
                            <td>
                                <button onClick={() => props.editar(o.id)} className="btn btn-primary btn-sm">Editar</button>
                                <button onClick={() => props.excluir(o.id)} className="btn btn-danger btn-sm">Excluir</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        {" "}
                        <td colSpan={3}>Nenhum usuário.</td>{" "}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);
export default UsuarioList;
