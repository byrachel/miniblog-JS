

function submitContent() {

  // Création des variables des éléments saisis dans le formulaire
  var form = document.querySelector('#contentForm');
  var author = document.querySelector('#author');
  var email = document.querySelector('#email');
  var title = document.querySelector('#title');
  var content = document.querySelector('#content');

  // Création de la variable date d'envoi du formulaire
  var date = new Date();
  document.getElementById("date").value = date;

  // Création de la variable date d'envoi du formulaire
  var contentList = JSON.parse(localStorage.getItem('contentList'));

  // Création du tableau contenant les articles (s'il est vide)
  if(!contentList) {
    contentList = [];
  }

  // Création de la classe dédiées aux articles
  class BlogContent {
    constructor(author,email,title,content) {
      this.author = author;
      this.email = email;
      this.title = title;
      this.content = content;
      this.date = date;
    }
  }

  // Détection de la soumisson du formulaire
  form.addEventListener('submit', function(e) {
      e.preventDefault();

      //Instanciation d'un nouvel article
      var blogPost = new BlogContent(author.value,email.value,title.value,content.value);

      //Ajout de l'article dans le tableau
      contentList.push(blogPost);

      //Enregistrement des données du tableau
      localStorage.setItem('contentList', JSON.stringify(contentList));

      //Appel de la fonction : affichage de l'article
      displayBlogPost(blogPost);

      //Réinitialise le formulaire
      form.reset();
    })
}

// fonction pour insérer l'article dans le html -> à partir de l'objet
function displayBlogPost(blogPost) {

  // Je récupère les éléments HTML ou insérer le contenu du tableau
  var blog = document.querySelector('.blog');

  // Titre de l'article
  var postTitle = document.createElement('div');
  postTitle.className = 'blog-header';
  postTitle.innerHTML = blogPost.title;
  blog.appendChild(postTitle);

  // Texte de l'article
  var postBody = document.createElement('div');
  postBody.className = 'blog-body';
  postBody.innerHTML = blogPost.content;
  blog.appendChild(postBody);

  // Affichage de l'auteur
  var postAuthor = document.createElement('p');
  postAuthor.className = 'blog-author';
  postAuthor.innerHTML = 'Auteur: ' + blogPost.author;
  blog.appendChild(postAuthor);

  // Affichage de la date
  var postDate = document.createElement('p');
  postDate.className = 'blog-date';
  postDate.innerHTML = 'Le : ' + blogPost.date;
  blog.appendChild(postDate);

}

// Quand le DOM est chargé j'appelle ma fonction principale
window.addEventListener('DOMContentLoaded', function() {
    submitContent();
});
