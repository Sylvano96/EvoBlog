import { title } from 'process';
import { CreateServiceService } from './../Services/create-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-update-author',
  imports: [NavComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.css'
})
export class UpdateAuthorComponent implements OnInit{

  postId :number = 0
  data : Array<any> = []
  titleDis : string = "Titre"

  formulaire : FormGroup 
  title : FormGroup

  addSuccess : boolean = false

  isUpdate : boolean = false
  updateNum : number = 0
  erreurPost : boolean = false

  imagePreview : string | null = null 

  errorMessage : string | null = null

  count : number = 1
  fileName : string | null = null
  selectedFile !: File

    constructor(private fb : FormBuilder,private fbu : FormBuilder, private CreateServiceService : CreateServiceService,private route : ActivatedRoute,){
      this.formulaire = this.fb.group({
        titlePara : ["", Validators.required],
        content : ["", Validators.required]
      })
  
      this.title = this.fbu.group({
        title : ["", [Validators.required, Validators.maxLength(70)]]
      })
    }

    status!:boolean

    x : Array<any> = []

    oldFileName : string = ""
    idTable : any[] = []

    user_id : number = 0
  
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id')
    this.postId = idParam ? parseInt(idParam, 10) : 0

    this.CreateServiceService.update(this.postId).subscribe(response => {
      
      this.x = [response]
      console.log("Résultat : ",this.x[0].id)

      this.data = this.x[0].contents

      const a = []
      for(let x in this.data){
        a.push(this.data[x].id)
      }

      this.count = Math.max(...a)

      this.imagePreview ='http://localhost:8080/images/'+this.x[0].image

      console.log(this.imagePreview)
      this.titleDis = this.x[0].title
      this.categorie = this.x[0].category
      this.fileName = this.x[0].image
      this.oldFileName = this.x[0].image
      this.user_id=this.x[0].users

      this.status = (this.x[0].status == "publié" ) ? false  : true

    }, error => {
      console.log("Erreur : ", error)
    })
    
  }

  onClick(){
    
  }

  submitAddUp(){
    if(this.title.valid){
      this.titleDis = this.title.value.title
    }else{
      this.title.markAllAsTouched()
    }
  }

  update(id:number){
    const x = this.data.filter( data => data.id === id)
    
    this.formulaire.reset({
      titlePara : x[0].titlePara,
      content : x[0].content
    })

    this.updateNum = id
    this.isUpdate = true
    this.data = this.data.filter(data => data.id !== this.updateNum)
  }

  deletePara(id:number){
    const x = this.data.filter( data => data.id !== id)
    this.data = x
  }

  
  renderFalse(){
    this.erreurPost = false
    this.isUpdate = false
  }

   submit(){
    if(this.formulaire.valid){
      const x = {
        id:this.isUpdate ? this.updateNum : this.count+1,
        titlePara : this.formulaire.value.titlePara,
        content : this.formulaire.value.content
      }

      this.data.push(x)
      this.formulaire.reset()
      this.count++

      this.isUpdate = false
    }else{
      this.formulaire.markAllAsTouched()
    }
  
  }

  onFileSelected(event : Event){
    const file = (event.target as HTMLInputElement).files?.[0]

    if(file){

      const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'jfif', 'webp']

      const fileExtension = file.name.split('.').pop()?.toLowerCase()

      if(!fileExtension || !allowedExtensions.includes(fileExtension)){

        this.errorMessage = 'Extension de fichier non valide'
        this.imagePreview = null

        return
      }

      this.errorMessage = null
      this.selectedFile = file

      this.fileName = file.name

      const reader = new FileReader()

      reader.onload = ()=> {
        this.imagePreview = reader.result as string
      }

      reader.readAsDataURL(file)

      console.log(file)
    }
  }

  poster(){
    if( this.titleDis != 'Titre' && this.data.length != 0){
      if(this.fileName == null){
        this.errorMessage = "Veuillez sélectionner une image"
        return
      }
      const data = {
        title : this.titleDis,
        category : this.categorie,
        status:"publié",
        userId:this.user_id,
        image : this.fileName,
        contents : this.data,
      }

      this.CreateServiceService.updatePost( this.postId, data, this.selectedFile, this.oldFileName, this.fileName).subscribe((response)=>{
        this.addSuccess = true
        console.log('Résulat attendu : ', response)
        setTimeout(()=>{
          this.addSuccess = false
        }, 4000)
      }, (error)=>{
        console.log("Erreur : ", error)
      })


      this.data = []
      this.titleDis = 'Titre'
      this.title.reset()
      this.imagePreview = null
      this.renderFalse()
      console.log(this.oldFileName, this.fileName)
      if(this.oldFileName == this.fileName){
        console.log('Identique')
      }else{
        console.log("Différent")
      }
    }else{
      this.erreurPost = true
    }
  }

  nonPoster(){
    if( this.titleDis != 'Titre' && this.data.length != 0){
      if(this.fileName == null){
        this.errorMessage = "Veuillez sélectionner une image"
        return
      }
      const data = {
        title : this.titleDis,
        category : this.categorie,
        status:"non publié",
        userId:this.user_id,
        image : this.fileName,
        contents : this.data,
      }

      this.CreateServiceService.updatePost( this.postId, data, this.selectedFile, this.oldFileName, this.fileName).subscribe((response)=>{
        this.addSuccess = true
        console.log('Résulat attendu : ', response)
        setTimeout(()=>{
          this.addSuccess = false
        }, 4000)
      }, (error)=>{
        console.log("Erreur : ", error)
      })


      this.data = []
      this.titleDis = 'Titre'
      this.title.reset()
      this.imagePreview = null
      this.renderFalse()

      console.log(this.oldFileName, this.fileName)
      if(this.oldFileName == this.fileName){
        console.log('Identique')
      }else{
        console.log("Différent")
      }
    }else{
      this.erreurPost = true
    }
  }

  categorie : string = "Technologie"

  modifyCat(event : Event){
    this.categorie = (event.target as HTMLInputElement).value
  }
}
