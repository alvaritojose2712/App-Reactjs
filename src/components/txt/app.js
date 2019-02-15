import React, {Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/font-awesome/css/font-awesome.css'

export default class App extends Component{
	constructor(){
		super()
		this.state = {
			text:``,
			file: [],
			selectCol:null,
			rellenarCon:"",
			salida:[],
			arrMasLargo:{largo:0,indice:0},
			permisoDescargar:false,
			separarCols:"",
			reemplazarCaracteres:""
		}
		this.handleChange = this.handleChange.bind(this)
		this.moveCol = this.moveCol.bind(this)
		this.addConstantes = this.addConstantes.bind(this)
		this.rellenarCon = this.rellenarCon.bind(this)
		this.procesar = this.procesar.bind(this)
		this.multi_str = this.multi_str.bind(this)
		this.allLimite = this.allLimite.bind(this)
		this.selectFile = this.selectFile.bind(this)
		this.descargarTxt = this.descargarTxt.bind(this)
		this.allDelete = this.allDelete.bind(this)
		this.uniDelete = this.uniDelete.bind(this)
		this.separarColFun = this.separarColFun.bind(this)
		this.reemplazarCaracteresFun = this.reemplazarCaracteresFun.bind(this)
		this.createFile = this.createFile.bind(this)
		this.useConfig = this.useConfig.bind(this)

	}
	handleChange(e){
		let copy = JSON.parse(JSON.stringify(this.state.file))

		let x = e.target.attributes['data-x'].value
		let y = e.target.attributes['data-y'].value
		let limite = e.target.value===""?0:e.target.value.replace(/\D/g,"")
		limite = limite>500?500:limite

		copy[y][x].limite = limite
		this.setState({file:copy},()=>this.procesar());	
	}
	moveCol(e,x){
		// console.log(x)
		const {selectCol,file} = this.state
		if (selectCol!==null) {
			let copy = JSON.parse(JSON.stringify(file))

			copy.map((e,i)=>{
				let ori = {...e[x]}
				let des = {...e[selectCol]}
				
				e[x] = des
				e[selectCol] = ori
			})

			this.setState({
				selectCol:null,
				file:copy
			},()=>this.procesar());
		}else{
			this.setState({
				selectCol:x
			});
		}
	}
	rellenarCon(e){
		this.setState({rellenarCon:e.target.value.replace(/\D/g,"")},()=>this.procesar());
	}
	separarColFun(e){
		this.setState({separarCols:e.target.value},()=>this.procesar());
	}
	reemplazarCaracteresFun(e){
		if (!e.target.value.length) {
			this.createFile()
		}else{


			let reemplazar = new RegExp(`[${e.target.value}]`,"g")

			let copy = JSON.parse(JSON.stringify(this.state.file))
			let newArr = []
			copy = copy.map((e,i)=>{
				let arr1 = []
				e.map((ee,ii)=>{
					arr1.push({...ee,valor:ee.valor.replace(reemplazar,"")})
				})
				newArr.push(arr1)

			})

			this.setState({
				file:newArr 
			},()=>this.procesar());
		}
		this.setState({reemplazarCaracteres:e.target.value});
	}
	addConstantes(){
		const {despuesDeConstante,valConstante} = this.refs
		let index = parseInt(despuesDeConstante.value)
		valConstante.value = valConstante.value.replace(/\D/g,"")
		if(valConstante.value!==""){


			let copy = JSON.parse(JSON.stringify(this.state.file))
			copy.map((e,i)=>{
				e.splice(index,0,{valor:valConstante.value,limite:valConstante.value.length,const:true})

			})
			this.setState({
				file: copy
			},()=>this.procesar());
		}
	}
	allDelete(coordenada,indice){
		let copy = JSON.parse(JSON.stringify(this.state.file))
		let arrMasLargo = 0
		if (coordenada==="y") {
			copy = copy.filter((e,i)=>{
				arrMasLargo = arrMasLargo.largo>=e.length?arrMasLargo:{largo:e.length,indice:i}
				return i!==indice
			})
		}else{
			let arr;
			copy = copy.map((e,i)=>{
				
				arr = e.filter((ee,ii)=>{
					return ii!==indice
				})
				arrMasLargo = arrMasLargo.largo>=arr.length?arrMasLargo:{largo:arr.length,indice:i}
				return arr
			})
		}
		this.setState({
			file: copy,
			arrMasLargo:arrMasLargo,
		},()=>this.procesar());
	}
	uniDelete(x,y){
		let copy = JSON.parse(JSON.stringify(this.state.file))
		copy[y] = copy[y].filter((ee,ii)=>ii!==x)
		this.setState({
			file:copy 
		},()=>this.procesar());
	}
	multi_str(mult){	
		let _new = "";
		for(let i=0; i<mult; i++){
			_new += this.state.rellenarCon;
		}
		return _new;
	}
	allLimite(event,coordenada,indice){
		let copy = JSON.parse(JSON.stringify(this.state.file))
		let valor = event.target.value!==""?event.target.value.replace(/\D/g,""):0
		valor = valor>500?500:valor
		event.target.value = valor

		if (coordenada==="y") {
			copy[indice].map((ee,ii)=>{
				if (ee) ee.limite = valor
			})
		}else{
			copy.map((e,i)=>{
				e.map((ee,ii)=>{
					if (ee&&ii===indice) ee.limite = valor
				})
			})
		}
		
		this.setState({
			file:copy 
		},()=>this.procesar());
	}
	selectFile(e,text=null){
		  const _default = {
		  	0:[20,8,17,4],
		  	1:[4,12,20,10,1],
		  }


		  var archivo = e.target.files[0];
		  if (!archivo) {
		    return;
		  }
		  var lector = new FileReader();
		  lector.onload = e => {
		    var contenido = e.target.result;
			this.setState({
				text:contenido
			},this.createFile);
		  };
		  lector.readAsText(archivo,"ISO-8859-1");

	}
	createFile(){
		let arrMasLargo = 0
		let fila
		let fileClean = this
		.state
		.text
		.replace(/\r/g,"")
		.split(/\n/)
		.map(e=>e?e.split(/\t/).filter(ee=>ee&&ee.length):null)
		.filter(e=>e&&e.length)
		.map((e,i)=>{
			fila = (i===0)?0:1

			arrMasLargo = arrMasLargo.largo>=e.length?arrMasLargo:{largo:e.length,indice:i} 
			return e.map((ee,ii)=>{
				// let colLimit = _default[fila][ii]?_default[fila][ii]:0
				return {valor:ee,limite:100} 
			})
		})
		this.setState({
			file: fileClean,
			arrMasLargo:arrMasLargo,
		},()=>this.procesar());
	}

	procesar(){
		try{
			let arrMasLargo = 0
			let salida = []
			const {file} = this.state
			file.map((e,i)=>{
				arrMasLargo = arrMasLargo.largo>=e.length?arrMasLargo:{largo:e.length,indice:i} 
				let arr = []
				e.map((ee,ii)=>{
					if (ee&&typeof ee === "object"&&Object.keys(ee).length) {
						let tab = ee.valor
						if (parseInt(ee.limite)-tab.length<0) throw `Error: campo ${ii}x${i} sobrepasa el límite especificado`;
						let sep = !ii?"":this.state.separarCols

						arr.push(sep+this.multi_str(parseInt(ee.limite)-tab.length)+tab.toString())
					}
					
				})
				salida.push(arr)
			
			})
			this.setState({salida:salida,permisoDescargar:true,arrMasLargo:arrMasLargo,});
		}catch(err){
			console.log(err)
			this.setState({
				permisoDescargar:false,
				salida:[]
			});
		}
	}
	descargarTxt(e){
		let nombre = window.prompt("Nombre del TXT...")
		if (this.state.salida.length && nombre) {
			console.log(this.state.salida)
			let str = ""
			this.state.salida.map((e,i)=>{
				str += e.join("")+`\n`
			})

			var elem = e.target;

			elem.download = nombre+".txt";
			elem.href = "data:application/octet-stream," 
			                     + encodeURIComponent(str);
		}
	}
	useConfig(){
		let copy = JSON.parse(JSON.stringify(this.state.file))
		const _default = {
		  	0:[20,8,17,4],
		  	1:[4,12,20,10,{valor:"00"},{valor:"1"},{valor:"00000"}],
		}
		const _defaultConst = []
		let row;
		copy.map((e,i)=>{
			e.map((ee,ii)=>{
				row = !i?0:1 
				if(typeof _default[row][ii]==="object"){
					// e.splice(ii,0,{const:true,limite:_default[row][ii].length,valor:_default[row][ii]})
				}else{
					ee.limite = _default[row][ii]
				}
			})
		})
		this.setState({
			file:copy 
		},()=>this.procesar());
	}
	render(){
		const {file,salidaEstructura,constantes,salida,arrMasLargo} = this.state
					
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-3 p-5">
						<div className="mb-5">
							<h3>
								Seleccione archivo de texto...
							</h3>
							<input type="file" className="form-control" onChange={this.selectFile}/>
						</div>
						<div className="mb-5">
							<div className="form-group">
							    <h3>Agregar constantes en la posición...</h3>
							    
								<select ref="despuesDeConstante" className="form-control">
									{
										file.length&&file[arrMasLargo.indice].length
										?<React.Fragment>
											{
												file[arrMasLargo.indice].map((ee,ii)=>
													<option 
													value={ii}	
													key={ii}>
														{ii+1}
													</option>
												)								
											}
											<option value={file[arrMasLargo.indice].length}>
												{file[arrMasLargo.indice].length+1}
											</option>
										</React.Fragment>
										:null
										
									}
								</select>
							</div>
						  	<div className="form-group">
						    	<h4>Con el valor...</h4>
								<input 
								placeholder="Valor de la constante"
								className="form-control" 
								ref="valConstante"/>
						 	</div>

								
							<button className="btn btn-outline-primary" onClick={this.addConstantes}>
								Agregar	 
							</button>
						</div>
						<div className="mb-5">
							<button className="btn btn-danger" onClick={()=>this.useConfig()}>Usar configuracion de Banco Bicentenario</button>
						</div>
						<div className="mb-5">
							<h3>Rellenar con: </h3>
							<input 
							placeholder="Rellenar con..." 
							value={this.state.rellenarCon}
							className="form-control"
							onChange={this.rellenarCon}/>
						</div>
						<div className="mb-5">
							<h3>Separar columnas por: </h3>
							<input 
							placeholder="Separar columnas por..." 
							value={this.state.separarCols}
							className="form-control"
							onChange={this.separarColFun}/>
						</div>
						<div className="mb-5">
							<h3>Eliminar los siguientes carácteres: </h3>
							<input 
							placeholder="Eliminar los siguientes carácteres..." 
							value={this.state.reemplazarCaracteres}
							className="form-control"
							onChange={this.reemplazarCaracteresFun}/>
						</div>
						
					</div>
					<div className="col table-responsive p-2">
						<h1>TXT Generator</h1>
						<table className="table">
							<thead>
							{	
								file.length&&file[arrMasLargo.indice].length
								?<React.Fragment>
									<tr>
									{
										file[arrMasLargo.indice].map((ee,ii)=>
											<React.Fragment key={ii}>
												{
													!ii ?<td></td> :null
												}
												<td>
													<div className="btn-group-vertical">
														<button
														onClick={
															(e)=>this.allDelete("x",ii)
														} 
														className="btn btn-outline-warning">
															<i className="fa fa-close"></i>
														</button>
														<input
														onChange={
															(e)=>this.allLimite(e,"x",ii)
														}
														defaultValue="0"
														className="form-control text-center"/>
													</div>
												</td>
											</React.Fragment>
										)
									}
									</tr>	
								</React.Fragment>
								:null
							}
							</thead>
							<tbody>
							{	
								file
								.map((e,i)=>
									<tr key={i}>
									{
										e.map((ee,ii)=>
										<React.Fragment key={ii}>
											{
												!ii
												?<td key={ii} >
													<div className="btn-group" style={{width:100}}>
														<button
														onClick={
															(e)=>this.allDelete("y",i)
														}
														className="btn btn-outline-warning">
															<i className="fa fa-close"></i>
														</button>
														<input
														onChange={
															(e)=>this.allLimite(e,"y",ii)
														}
														defaultValue="0"
														className="form-control text-center"/>
													</div>
												</td>
												:null
											}
											{	
												ee&&typeof ee === "object"&&Object.keys(ee).length
												?<td 
												className={this.state.selectCol==ii?"bg-danger":""}>
													<div className="btn-group-vertical">
														{
															ee.const
															?<React.Fragment>
																<button
																className="btn btn-outline-warning-warning"
																onClick={()=>this.uniDelete(ii,i)}
																><i className="fa fa-close"></i></button>
																<button
																className="btn btn-warning"
																onClick={(e)=>this.moveCol(e,ii)}
																>{ee.valor}</button>
															</React.Fragment>
															:<React.Fragment>
																<button
																className="o-3 btn btn-outline-warning"
																onClick={()=>this.uniDelete(ii,i)}
																><i className="fa fa-close"></i></button>
																<button
																className="btn btn-danger"
																onClick={(e)=>this.moveCol(e,ii)}
																>{ee.valor}</button>
																<input
																	className="form-control text-center o-3"
																	data-x={ii}
																	data-y={i}
																	value={ee.limite}
																	onChange={this.handleChange}
																	/>
															</React.Fragment>
														}
													</div>
												</td>
												:null
											}
										</React.Fragment>
										)
									}
									</tr>
								)	
							}				
							</tbody>
						</table>
						<div>
						{
							salida.length
							?<React.Fragment>
								{	
									this.state.permisoDescargar
									?<a 
									className="btn btn-outline-warning" 
									onClick={this.descargarTxt}>
										Descargar TXT
									</a>
									:null
								}
								<table className="table">
									<tbody>
										{
										salida.map((e,i)=>
											<tr key={i}>
												{
													e.map((ee,ii)=>
														<td key={ii}>{ee}</td>
													)
												}
											</tr>
											)
										}	
									</tbody>
								</table>
							</React.Fragment>
							:null
						}
						</div>
					</div>
				</div>
			</div>	
		)
	}
}