import { response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../Database/mysql';
import { generateJsonWebToken } from '../Lib/JwToken';

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'email existe et récupérer l'utilisateur en un seul appel SQL
        const userdb = await pool.query(`CALL SP_LOGIN(?);`, [email]);

        if (!userdb || userdb[0].length === 0) {
            return res.status(400).json({
                resp: false,
                msg: 'Wrong Credentials1'
            });
        }

        const user = userdb[0][0];

        // **Comparaison du mot de passe en texte clair avec celui haché dans la base de données**
        const isPasswordValid = await bcrypt.compare(password, user.passwordd);
        if (!isPasswordValid) {
            return res.status(401).json({
                resp: false,
                msg: 'Wrong Credentials2'
            });
        }

        // Génération du token JWT
        const token = await generateJsonWebToken(user.uid);

        // Réponse avec le token et les informations de l'utilisateur
        res.json({
            resp: true,
            msg: 'Welcome to Frave Restaurant',
            user: {
                uid: user.uid,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                email: user.email,
                rol_id: user.rol_id,
                notification_token: user.notification_token
            },
            token
        });

    } catch (e) {
        console.error('Login Error:', e); // Affiche l'erreur complète dans la console
        return res.status(500).json({
            resp: false,
            msg: e.message, // Renvoie le message d'erreur exact
        });
    }
}






export const renewTokenLogin = async ( req, res = response ) => {

    try {

        const token = await generateJsonWebToken( req.uid );

        const userdb = await pool.query(`CALL SP_RENEWTOKENLOGIN(?);`, [ req.uid ]);

        const user = userdb[0][0];
        
        res.json({
            resp: true,
            msg : 'Welcome to Frave Restaurant',
            user: {
                uid: user.uid,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                phone: user.phone,
                email: user.email,
                rol_id: user.rol_id,
                notification_token: user.notification_token
            },
            token
        });
        
    } catch (e) {
        res.status(500).json({
            resp: false,
            msg : e
        });
    }

}