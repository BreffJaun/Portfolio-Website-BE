// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";
import multer from "multer";

// I M P O R T:  F U N C T I O N S
import { objectIdValidator } from "../middleware/objectIdValidator";
import { landingPageValidator } from "../middleware/landingPageValidator";
import { mySelfValidator } from "../middleware/mySelfValidator";
import { stackDescriptionValidator } from "../middleware/stackDescriptionValidator";
import { stackTechnologiesValidator } from "../middleware/stackTechnologiesValidator";
import { projectsValidator } from "../middleware/projectsValidator";
import { projectsDescriptionValidator } from "../middleware/projectsDescriptionValidator";
import { validateRequest } from "../middleware/validator";
import { certificatesValidator } from "../middleware/certificatesValidator";
import { certificatesDescriptionValidator } from "../middleware/certificateDescriptionValidator";

// I M P O R T:  C O N T R O L L E R
import {
  getLandingPageContent,
  patchLandingPageContent,
  getMySelfContent,
  patchMySelfContent,
  getStackContent,
  patchStackDescription,
  postStackTechnologies,
  patchStackTechnologies,
  deleteStackTechnologies,
  getProjects,
  patchProjectDescription,
  postProjects,
  patchProjects,
  deleteProjects,
  getCertificatesContent,
  patchCertificatesDescription,
  postCertificates,
  patchCertificates,
  deleteCertificates,
} from "../controller/contentController";

import { auth } from "../middleware/auth";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
import { uploadMedia, uploadAvatar } from "../services/media/multer";
import { get } from "http";

// C R E A T E   R O U T E S
const router = express.Router();

// R O U T E S
router
  .route("/landingpage")
  .get(getLandingPageContent)
  .patch(landingPageValidator, validateRequest, patchLandingPageContent);

router
  .route("/myself")
  .get(getMySelfContent)
  .patch(mySelfValidator, validateRequest, patchMySelfContent);

router.route("/stack").get(getStackContent);

router
  .route("/stack/description")
  .patch(stackDescriptionValidator, validateRequest, patchStackDescription);

router
  .route("/stack/technologies")
  .post(
    uploadMedia,
    stackTechnologiesValidator,
    validateRequest,
    postStackTechnologies
  );

router
  .route("/stack/technologies/:id")
  .patch(
    uploadMedia,
    stackTechnologiesValidator,
    validateRequest,
    patchStackTechnologies
  )
  .delete(deleteStackTechnologies);

router.route("/certificates").get(getCertificatesContent);

router
  .route("/certificates/description")
  .patch(
    certificatesDescriptionValidator,
    validateRequest,
    patchCertificatesDescription
  );

router
  .route("/certificates/items")
  .post(uploadMedia, certificatesValidator, validateRequest, postCertificates);

router
  .route("/certificates/items/:id")
  .patch(uploadMedia, certificatesValidator, validateRequest, patchCertificates)
  .delete(deleteCertificates);

router.route("/projects").get(getProjects);

router
  .route("/projects/description")
  .patch(
    projectsDescriptionValidator,
    validateRequest,
    patchProjectDescription
  );

router
  .route("/projects/projects")
  .post(uploadMedia, projectsValidator, validateRequest, postProjects);

router
  .route("/projects/projects/:id")
  .patch(uploadMedia, projectsValidator, validateRequest, patchProjects)
  .delete(deleteProjects);

export default router;
