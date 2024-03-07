import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../services/alumnos.service';
import { SesionService } from '../../../services/sesiones.service';
import * as echarts from 'echarts';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-ver-perfil-alumno',
  templateUrl: './ver-perfil-alumno.component.html',
  styleUrl: './ver-perfil-alumno.component.css'
})

export class VerPerfilAlumnoComponent implements OnInit, AfterViewInit {

  alumnosData: any;
  private claseID: any;

  constructor(private alumnoService: AlumnoService, private router: Router, private activatedRoute: ActivatedRoute, private sesionService: SesionService){
    this.alumnosData = [];
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.alumnosData = history.state.alumno;
      this.alumnosData.Ambitos = JSON.parse(this.alumnosData.Ambitos);
      this.claseID = history.state.claseID;
    });
  }

  ngAfterViewInit() {
    this.sesionService.getSesionesAlumno(this.alumnosData.ID_Alumno).subscribe((res: any) => {
      const sesiones = res.sesiones;
      this.alumnosData.Ambitos.Clase = sesiones.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Clase);
      this.alumnosData.Ambitos.Amigos = sesiones.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Amigos);
      this.alumnosData.Ambitos.Familia = sesiones.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Familia);
      this.alumnosData.Ambitos.Emociones = sesiones.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin).Emociones);
      this.alumnosData.Ambitos.FueraClase = sesiones.map((sesion: any) => JSON.parse(sesion.ValorAmbitoFin)["Fuera de clase"]);

      var chartDom = document.getElementById('chart')!;
      var myChart = echarts.init(chartDom);
      var option: echarts.EChartsOption;

      option = {
        title: {
          text: 'Seguimiento'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Clase', 'Amigos', 'Familia', 'Emociones', 'Fuera de Clase']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
        },
        yAxis: {
          type: 'category'
        },
        series: [
          {
            name: 'Clase',
            type: 'line',
            stack: 'Total',
            data: this.alumnosData.Ambitos.Clase
          },
          {
            name: 'Amigos',
            type: 'line',
            stack: 'Total',
            data: this.alumnosData.Ambitos.Amigos
          },
          {
            name: 'Familia',
            type: 'line',
            stack: 'Total',
            data: this.alumnosData.Ambitos.Familia
          },
        ]
      };

      option && myChart.setOption(option);
    });
    
  }

  volver(){
    this.router.navigate(['profesores/ver-alumnos'], {state: {claseID: this.claseID}});
  }

}
