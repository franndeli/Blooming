import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MotorGrafico } from '../../../graphics/motor/motorGrafico';

@Component({
  selector: 'app-arbol-escena',
  templateUrl: './arbol-escena.component.html',
  styleUrls: ['./arbol-escena.component.css']
})

export class ArbolEscenaComponent implements AfterViewInit {
  @ViewChild('canvasWebGL') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private motorGrafico: MotorGrafico) { }

  async ngAfterViewInit() {
    this.motorGrafico.iniciarEscena(this.canvasRef);
  }
  /*
  async iniciarEscena(): Promise<void> {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      const canvas = this.canvasRef.nativeElement;
      const gl = canvas.getContext('webgl');
  
      if (!gl) {
        console.error('No se puede inicializar WebGL. Tu navegador o máquina puede no soportarlo.');
        return;
      }

      gl.clearColor(0.0, 2.0, 4.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);

      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      // Códigos de shaders (vertex y fragment) aquí o cargados de alguna manera

      if(vertexShader){
        console.log('hola');
        gl.shaderSource(vertexShader, vertexShaderText);
      }

      if(fragmentShader){
        console.log('hola1');
        gl.shaderSource(fragmentShader, fragmentShaderText);
      }

      // Compila y enlaza el programa de shader
      // const shaderProgram = this.createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

      if(vertexShader){
        console.log('hola2');
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
          return;
        }
      }

      if(fragmentShader){
        console.log('hola3');
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
          return;
        }
      }

      const program = gl.createProgram();
      if(program && vertexShader){
        console.log('hola4');
        gl.attachShader(program, vertexShader);
      }

      if(program && fragmentShader){
        console.log('hola5');
        gl.attachShader(program, fragmentShader);
      }

      if(program){
        console.log('hola6');
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error('ERROR linking program!', gl.getProgramInfoLog(program));
          return;
        }
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
          console.error('ERROR validating program!', gl.getProgramInfoLog(program));
          return;
        }
      }
      
      // Carga los recursos necesarios para la malla
      await this.gestorRecursos.cargarRecurso('mallaEjemplo', 'malla', '../../../../assets/json/malla.json');
      
      // Asigna el recurso malla a la variable
      const recursoMalla = this.gestorRecursos.getRecurso('mallaEjemplo', 'malla') as TRecursoMalla;
      
      console.log(recursoMalla);
      if (recursoMalla) {
        // Llama al método dibujar de recursoMalla
        if(program){
          //console.log('hola7');
          //console.log(program);
          console.log(gl);
          console.log(recursoMalla.dibujar(gl, program));
        }
      }

      
      var triangleVertices = 
      [ // X, Y,       R, G, B
        0.0, 0.5,    1.0, 1.0, 0.0,
        -0.5, -0.5,  0.7, 0.0, 1.0,
        0.5, -0.5,   0.1, 1.0, 0.6
      ];

      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      if(program){
        var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        gl.vertexAttribPointer(
          positionAttribLocation, // Attribute location
          2, // Number of elements per attribute
          gl.FLOAT, // Type of elements
          false,
          5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
          0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.vertexAttribPointer(
          colorAttribLocation, // Attribute location
          3, // Number of elements per attribute
          gl.FLOAT, // Type of elements
          false,
          5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
          2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
        );

        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(colorAttribLocation);

        
        //Main render loop
        
        gl.useProgram(program);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    } else {
      console.error('El elemento canvas no está disponible.');
    }
  }
  */
}
