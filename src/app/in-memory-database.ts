import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataBase implements InMemoryDbService {

    createDb() {
        const categories = [
            { id: 1, name: 'Robin', description: 'Esportes radicais' },
            { id: 2, name: 'Saúde', description: 'Plano de saúde e Remédios' },
            { id: 3, name: 'Lazer', description: 'sitio, parque, praia e etc...' },
            { id: 4, name: 'Salário', description:  'alto nivél salarial.' },
            { id: 5, name: 'Moradia', description: 'Pagamentos de contas da casa.' },
            { id: 6, name: 'Freelas', description: 'Trabalho como Freelancer' },
        ];
        return { categories}
    }
}