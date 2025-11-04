-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "name_user" TEXT NOT NULL,
    "lastName_user" TEXT NOT NULL,
    "email_user" TEXT NOT NULL,
    "password_user" TEXT NOT NULL,
    "rolId_fk" INTEGER NOT NULL,
    "createdAt_user" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location_user" TEXT NOT NULL,
    "pregunta_referencia_user" TEXT NOT NULL,
    "phone_user" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id_candidate" SERIAL NOT NULL,
    "userId_fk" INTEGER NOT NULL,
    "url_linkedin" TEXT NOT NULL,
    "cv_url" TEXT NOT NULL,
    "id_viterbit" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id_candidate")
);

-- CreateTable
CREATE TABLE "Candidate_ProfessionalProfile" (
    "id_candidate_fk" INTEGER NOT NULL,
    "id_professionalProfile_fk" INTEGER NOT NULL,

    CONSTRAINT "Candidate_ProfessionalProfile_pkey" PRIMARY KEY ("id_candidate_fk","id_professionalProfile_fk")
);

-- CreateTable
CREATE TABLE "ProfessionalProfile" (
    "id_professionalProfile" SERIAL NOT NULL,
    "name_professionalProfile" TEXT NOT NULL,

    CONSTRAINT "ProfessionalProfile_pkey" PRIMARY KEY ("id_professionalProfile")
);

-- CreateTable
CREATE TABLE "Company" (
    "id_company" SERIAL NOT NULL,
    "userId_fk" INTEGER NOT NULL,
    "name_company" TEXT NOT NULL,
    "website_company" TEXT NOT NULL,
    "title_company" TEXT NOT NULL,
    "location_company" TEXT NOT NULL,
    "position_company" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id_company")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id_rol" SERIAL NOT NULL,
    "name_rol" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_user_key" ON "User"("email_user");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_userId_fk_key" ON "Candidate"("userId_fk");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_fk_key" ON "Company"("userId_fk");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolId_fk_fkey" FOREIGN KEY ("rolId_fk") REFERENCES "Rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_userId_fk_fkey" FOREIGN KEY ("userId_fk") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate_ProfessionalProfile" ADD CONSTRAINT "Candidate_ProfessionalProfile_id_candidate_fk_fkey" FOREIGN KEY ("id_candidate_fk") REFERENCES "Candidate"("id_candidate") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate_ProfessionalProfile" ADD CONSTRAINT "Candidate_ProfessionalProfile_id_professionalProfile_fk_fkey" FOREIGN KEY ("id_professionalProfile_fk") REFERENCES "ProfessionalProfile"("id_professionalProfile") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fk_fkey" FOREIGN KEY ("userId_fk") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
