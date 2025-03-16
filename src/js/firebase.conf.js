import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


  const firebaseConfig = {
    type: 'service_account',
    projectId: 'gestionnairedetachecefim2025',
    private_key_id: '0f66941cba302f0991e3bead2b0b275c51eb92ee',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5ILg4u0L9daqO\nXQv9O/i12zRUVuUWue6W06cl3UB+wmPuJBZzXqL2JNOGbVg7Id2Wr+k1Vk1onOqP\nEs1vlEq1FDWg3VX9C+mZz9Ve714lBAj/+YnW5SPBqbZIsPVXyfxSWegXPvB9hoOc\nHcc9JtbdsiEDEHxfTjewvr8Lx2PkahczDJF7QaJQ+zQ0IgLVwJM9CAllh6aFXSxN\n0eSYaI5gKRt1bQqe3qUXOOgSS+tB+7l7AbdN1qn/gBVjDR3dV/16R+g10ngwvyJy\nSgKhstYHcBklZ/yOfv3PQM5ywjPTnyOPbQOkzGzSIEXonkMkX5oBujNnyyzNzIch\nU41UirWvAgMBAAECggEADPHuGn7IWb4smvUurW/QHbH3oB4jZB9u64+z6cCQOKI8\nfUkmDhMur1ThOvknvkVz9TbVG9cDuq5I8zrhWqKym/mPIRyDssTDz5mU1fqZnq+q\n4XCq5CKfCXUQkKyvEIsd4F72Yl8S+fQPUo9SgJgtViXqi7L6FL/8wkMpoMKPMvLf\nENiJ0KQHmK08g9RQAYC3FDdOEZDeYp32WyeSSS5sH9nYsyArsHL92x+wNKYeDyRA\n5WRsih5VTuv0qfmH+Ui0nvY1pC7H/z5qDuPLHIVQygWo9UjLESB+ysrAypkQab2G\nkwYXEujLv7ikWqDIKKs7jWqSoeQUE+xvHD2P7hRfQQKBgQDeBqgdoMUkH6+h502P\n+LpCr3njUYQFWtiOMLd2wjTZC6Z38Q/pVlX6ZRUKUqrPR7702PFc3ielhW7vttLw\nUigPgul70B/xYneZfEzyl7LkNZV5YCsoXvwpmCsYhdZIx+MJpwgHg001kO7AUm0X\nlrucuggV4rNDYtNR/OzGdtO+NwKBgQDVdKnfHk/wQwzdPtrwHihSNsw3AwRNeay1\nvLA1olJlp5ktLs7brloifwhYQVMMVxBMn2IaUBdTlS7QlEUXtjNl+lbK25TML5G4\n7hB3LmX9B36LftPJk34RCJhgyi7cESNkb2Vjm28NqfhQcjpAGqwFb99mCn2yAIID\nbInZW6ZISQKBgHeFfdr1QStBI3s02Tw32Y0siaElsLxxO0LQVvNHeMueye6nhrlG\nEOLKp5j3B5yuMs38O3KS5STlv+KruMJGd+phvu84CvoW1+t4TrQJlfPkJKNCcfk5\nqOV7VTfOVJy5fi8kC95/gIDllKFTvgaEzlqAivm9IGOWP8xTK+Nq9HHhAoGBAJQe\nqYYXPbdmf7XDWR/IfYhXWCxQXpr4dN2Duu7s3aqGu2c8FPUiLo/DgOHlKqDkhX32\nF5hUvWsVmW/Jg4xptY7tQW7xInbyB3fBUxGw07raiXh5ILO/MnrVcQ+xHQU+q0WV\ne1C8WjqsGJCSQ1OaboYzVF01qHVtnsqLdbirvV5pAoGBAJrBb8tsKcsxCUaWF97z\n3mxKIVvbjp7IT5HY9MiTgPI66ne2opfqfU0XJz37Mh8LhvL0YSrpsloK47t5sgUH\n1jen64Aj+bwX1q4LvoNvukL3JvRbxE8yVpsFrQQMRv9PsLfugP5dLsSMIfzT0P5R\n2naCqgi38LE7yJzX6E6PIhUT\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-fbsvc@gestionnairedetachecefim2025.iam.gserviceaccount.com',
    client_id: '116957131181859916671',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40gestionnairedetachecefim2025.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  }

  const app = initializeApp(firebaseConfig)

  // Authentification et base de données Firestore
  const auth = getAuth(app)
  const db = getFirestore(app)
  
  export { auth, db }