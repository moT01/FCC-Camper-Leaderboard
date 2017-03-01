class Main extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            picked: [],
            alltime: [],
            recent: [],
        };
    } //end constructor()
    
    componentDidMount() {
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then((resp) => resp.json())
            .then((data) => {    
            
                const r = data.map(d => { return d; });
                this.setState({ 
                    recent: r, 
                    picked: r
                });
                        
            }).catch(function(error) {
                console.log('error');
            });
        
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
            .then((resp) => resp.json())
            .then((data) => {    
            
                const at = data.map(d => { return d; });
                this.setState({ alltime: at });
            console.log(at);
                        
            }).catch(function(error) {
                console.log('error');
            });
    } //end componentDidMount()  
        
    sort = (e) => {
        if(e.target.textContent === 'RECENT') {
            this.setState({
                picked: this.state.recent
            });
        } else {
            this.setState({
                picked: this.state.alltime
            });   
        }
    }; //end sort

    render() {
        return (   
            <table>
                <thead>
                    <tr height={30}>
                        <td className="rank">RANK</td>
                        <td className="username">USERAME</td>
                        <td className="picture"></td>
                        <td className="btn" onClick={this.sort.bind(this)}>RECENT</td>
                        <td className="btn" onClick={this.sort.bind(this)}>ALL TIME</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.picked.map((obj, index) => 
                        <tr key={obj[1]}>
                            <td>{index + 1}</td>
                            <td><a href={'https://freecodecamp.com/' + obj.username}>{obj.username}</a></td>
                            <td><a href={'https://freecodecamp.com/' + obj.username}><img src={obj.img} width={50}/></a></td>
                            <td>{obj.recent}</td>
                            <td>{obj.alltime}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        ); //end return
   } //end render()
} //end Main Component  

ReactDOM.render(<Main rank={0} />,document.getElementById('app'));