import { AuthService } from './../../AuthGuard/authService';
import { CommonModule } from '@angular/common';
import { CreateServiceService } from './../Services/create-service.service';
import { Component,} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,NavComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  formulaire : FormGroup 
  title : FormGroup
  constructor(private AuthService : AuthService,private fb : FormBuilder,private fbu : FormBuilder, private CreateServiceService : CreateServiceService){
    this.formulaire = this.fb.group({
      titlePara : ["", Validators.required],
      content : ["", Validators.required]
    })

    this.title = this.fbu.group({
      title : ["", [Validators.required, Validators.maxLength(70)]]
    })

    this.user_id = this.AuthService.getAuthId() 
    this.id = this.user_id ? parseInt(this.user_id, 10) : 0

    console.log(this.id, this.user_id)
  }

  id : number = 0

  user_id : string | null = null
  count : number = 0

  data : Array<any> = []

  titleDis : string = "Titre"
  
  addSuccess : boolean = false

  isUpdate : boolean = false
  updateNum : Array<number> = []
  erreurPost : boolean = false

  imagePreview : string | null = null 

  selectedFile !: File

  errorMessage : string | null = null

  fileName : string | null = null

  onFileSelected(event : Event){
    const file = (event.target as HTMLInputElement).files?.[0]

    if(file){

      const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'jfif']

      const fileExtension = file.name.split('.').pop()?.toLowerCase()

      if(!fileExtension || !allowedExtensions.includes(fileExtension)){

        this.errorMessage = 'Extension de fichier non valide'
        this.imagePreview = null

        return
      }else{
        this.errorMessage = null
        this.selectedFile = file

        this.fileName = file.name

        const reader = new FileReader()

        reader.onload = ()=> {
          this.imagePreview = reader.result as string
        }

        reader.readAsDataURL(file)
      }
    }
  }

  submit(){
    if(this.formulaire.valid){
      const x = {
          id:this.isUpdate ? this.updateNum[0] : this.getIdPara(),
          titlePara : this.formulaire.value.titlePara,
          content : this.formulaire.value.content
      }

      this.data = this.data.filter(data => data.id !== this.updateNum[0])

      this.data.push(x)
      this.formulaire.reset()
      this.count++

      this.updateNum = []
      this.isUpdate = false
    }else{
      this.formulaire.markAllAsTouched()
    }

    
  }

  // verification(){
  //   setInterval(()=>{
  //     if( this.titleDis != 'Titre' && this.data.length != 0){
  //       this.erreurPost = true
  //     }else{
  //       this.erreurPost = false
  //     }
  //   },1000 )
  // }

  submitAddUp(){
    if(this.title.valid){
      this.titleDis = this.title.value.title
    }else{
      this.title.markAllAsTouched()
    }
  }

  deletePara(id:number){
    const x = this.data.filter( data => data.id !== id)
    this.data = x
  }

  update(id:number){
    const x = this.data.filter( data => data.id === id)

    this.formulaire.reset({
      titlePara : x[0].titlePara,
      content : x[0].content
    })

    this.updateNum.push(id)

    this.isUpdate = true

    this.data = this.data.filter( data => data.id !== id)
  }

  renderFalse(){
    this.erreurPost = false
    this.isUpdate = false
  }


  // poster(){
  //   if( this.titleDis != 'Titre' && this.data.length != 0){
  //     if(this.fileName == null){
  //       this.errorMessage = "Veuillez sélectionner une image"
  //       return
  //     }
  //     const data = {
  //       title : this.titleDis,
  //       category : this.categorie,
  //       status:"publié",
  //       userId:this.id,
  //       image : this.fileName,
  //       contents : this.data,
  //     }
  //     this.CreateServiceService.addContent(data, this.selectedFile).subscribe((response)=>{
  //       this.addSuccess = true
  //       console.log('Résulat attendu : ', response)
  //       setTimeout(()=>{
  //         this.addSuccess = false
  //       }, 4000)
  //     }, (error)=>{
  //       console.log("Erreur : ", error)
  //     })

  //     this.data = []
  //     this.titleDis = 'Titre'
  //     this.title.reset()
  //     this.imagePreview = null
  //     this.renderFalse()
  //   }else{
  //     this.erreurPost = true
  //   }
  // }

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
        userId:this.id,
        image : this.fileName,
        contents : this.data,
      }
      this.CreateServiceService.addContent(data, this.selectedFile).subscribe((response)=>{
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
        userId:this.id,
        image : this.fileName,
        contents : this.data,
      }
      this.CreateServiceService.addContent(data, this.selectedFile).subscribe((response)=>{
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
    }else{
      this.erreurPost = true
    }
  }

  categorie : string = "Technologie"

  modifyCat(event : Event){
    this.categorie = (event.target as HTMLInputElement).value
  }
  
  getIdPara(){
   const x = Math.random()*1000
   return Math.floor(x)
  }
}
