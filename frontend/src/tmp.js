          <ul>
            { mythis.props.list.map(function(element, index) {
              return <li key={ index }><span>{ element.name } - { element.galaxy } - </span>                        
                        <Link to={{ pathname: ("/info/"+element.id) , state: {star: element}}}><span>info</span></Link> 
                        <span> - </span>
                        <Link to={{ pathname: ("/edit/"+element.id) , state: {star: element}}}><span>edit</span></Link>
                        <span> - </span>
                        <a href="" onClick={(e) =>{mythis.props.delete(e,element.id);}}><span>supprimer</span></a>
                      </li>
            })}
          </ul>


          <Menu style={{ width: 70 }}>
            <SubMenu key="sub4" title={<Icon type="setting" />}>
              <Menu.Item key="9">En savoir plus</Menu.Item>
              <Menu.Item key="10">Modifier</Menu.Item>
              <Menu.Item key="11">Supprimer</Menu.Item>
            </SubMenu>
          </Menu>

          <ul>
            { mythis.props.list.map(function(element, index) {
              return  <li key={ index }><span>{ element.name } - { element.galaxy } - </span>
                        <Menu style={{ width: 70 }}>
                          <SubMenu key="sub4" title={<Icon type="setting" />}>
                            <Menu.Item key="9"><Link to={{ pathname: ("/info/"+element.id) , state: {star: element}}}><span>En savoir plus</span></Link></Menu.Item>
                            <Menu.Item key="10"><Link to={{ pathname: ("/edit/"+element.id) , state: {star: element}}}><span>Modifier</span></Link></Menu.Item>
                            <Menu.Item key="11"><a href="" onClick={(e) =>{mythis.props.delete(e,element.id);}}><span>Supprimer</span></a></Menu.Item>
                          </SubMenu>
                        </Menu>
                      </li>
            })}
          </ul>

          <Menu style={{ width: 70 }}>
            <SubMenu key="sub4" title={<Icon type="setting" />}>
            
            <Menu.Item key="10">Modifier</Menu.Item>
            <Menu.Item key="11">Supprimer</Menu.Item>
          </SubMenu>
        </Menu>

