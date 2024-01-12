import { createAction, props } from '@ngrx/store';

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { createReducer } from '@ngrx/store';

export interface StoreState {
  countries: CountriesState;
}

export interface CountriesState {
  items: any[];
}

const INITIAL_STATE: CountriesState = {
  items: [],
};

export enum StoreActions {
  COUNTRIES = 'Countries',
  COUNTRIES_SUCCESS = 'Countries Success',
}

export const COUNTRIES_LOAD = createAction(StoreActions.COUNTRIES);
export const COUNTRIES_LOAD_SUCCESS = createAction(
  StoreActions.COUNTRIES_SUCCESS,
  props<{ items: any[] }>()
);

const countries = [
  {
    id: '60f2a9a5-1604-4c86-8175-52ffd8a9591d',
    ordinal: 1,
    description: 'IMPOSTOS',
    costCenterSubs: [
      {
        id: 'db717783-e852-4b48-a035-d8b8156e8b9e',
        ordinal: 1,
        description: 'Imposto de Renda',
      },
      {
        id: '4fb54990-5ee0-44c6-ae0a-a31df4e2f8c1',
        ordinal: 2,
        description: 'TV',
      },
      {
        id: '3c7694d1-ff1b-4116-b410-8e15486e5999',
        ordinal: 3,
        description: 'Moradia',
      },
      {
        id: 'a59c1fa5-1ac2-45b6-99d8-7bf8bff5e8a3',
        ordinal: 4,
        description: 'Transporte',
      },
    ],
  },
  {
    id: '73abee55-373a-4258-a7cd-2eef083df182',
    ordinal: 2,
    description: 'MORADIA',
    costCenterSubs: [
      {
        id: '3a6158ba-02e0-431f-9bf7-4913c8859095',
        ordinal: 1,
        description: 'Financiamento',
      },
      {
        id: '79ae6812-ea23-490c-a356-b99284ff837c',
        ordinal: 2,
        description: 'Manutenção',
      },
      {
        id: 'f6120c75-ad20-4b5d-bcad-d345ff8bdcfe',
        ordinal: 3,
        description: 'Energia',
      },
      {
        id: '5e185e33-0ad0-4db3-ac47-b3c7ea35cfc6',
        ordinal: 4,
        description: 'Água',
      },
      {
        id: '127cc538-067f-4de6-af16-afd4e1904cec',
        ordinal: 5,
        description: 'Aquecimento',
      },
      {
        id: 'd2ff2b86-6700-40e4-b7ca-ab413635e080',
        ordinal: 6,
        description: 'Telefone',
      },
      {
        id: 'f07f76b7-414e-4919-9735-3dcd6bb87446',
        ordinal: 7,
        description: 'Internet',
      },
      {
        id: 'bcc5e9a7-0888-4630-b412-b866b40cccfe',
        ordinal: 8,
        description: 'Móveis',
      },
    ],
  },
  {
    id: '1c014645-a91f-46a6-bb88-21b8045525f7',
    ordinal: 3,
    description: 'ALIMENTAÇÃO',
    costCenterSubs: [
      {
        id: '0c168b3b-9edb-4299-aabe-1077af83ef4a',
        ordinal: 1,
        description: 'Supermercado',
      },
      {
        id: 'b35aa8b7-863c-4663-ac18-70b796070ded',
        ordinal: 2,
        description: 'Restaurantes',
      },
      {
        id: '15d8cdf4-f938-4254-9429-69ffbceaecd4',
        ordinal: 3,
        description: 'Lanches',
      },
    ],
  },
  {
    id: 'b30fe4c4-13bb-41e3-b4df-58783f02a503',
    ordinal: 4,
    description: 'VESTUÁRIO',
    costCenterSubs: [
      {
        id: '9bc439a1-36dd-4d3c-9e9d-d121a4c5aac5',
        ordinal: 1,
        description: 'Roupas',
      },
      {
        id: '5f4d0edb-abc3-432f-b813-9a47e45dbcba',
        ordinal: 2,
        description: 'Sapatos',
      },
      {
        id: 'e6a32b63-6991-4baf-9cd2-185f597afc97',
        ordinal: 3,
        description: 'Acessórios',
      },
    ],
  },
  {
    id: '41a3f310-0a54-4189-8783-0f01315099f6',
    ordinal: 5,
    description: 'TRANSPORTE',
    costCenterSubs: [
      {
        id: '66cedc54-775f-45c9-963b-38a0cb74f3b4',
        ordinal: 1,
        description: 'Financiamento',
      },
      {
        id: '5401cab8-7c03-44f9-ac3d-02ee073502a9',
        ordinal: 2,
        description: 'Combustível',
      },
      {
        id: 'aea6d158-cb2a-4527-a911-ee05524a06cc',
        ordinal: 3,
        description: 'Transporte Público',
      },
      {
        id: '399a77da-f91d-4c24-86db-bad640cbe7de',
        ordinal: 4,
        description: 'Manutenção',
      },
      {
        id: '6a1269d0-3c9c-4400-a8fd-06de75dc986f',
        ordinal: 5,
        description: 'Seguro',
      },
    ],
  },
  {
    id: '15e24ae2-2878-4e7e-b909-ff088cb2361a',
    ordinal: 6,
    description: 'SAÚDE',
    costCenterSubs: [
      {
        id: 'dcb7426b-e676-4b24-906c-03af0f82e08d',
        ordinal: 1,
        description: 'Plano de Saúde',
      },
      {
        id: 'e7c649bb-165e-40dd-8881-02c450aa2faa',
        ordinal: 2,
        description: 'Farmácia',
      },
      {
        id: '35953c06-3bbf-4835-988d-14cdddf7e415',
        ordinal: 3,
        description: 'Consultas Médicas',
      },
      {
        id: 'ec976e4f-f7e9-42b4-aed2-8aa807516580',
        ordinal: 4,
        description: 'Exames',
      },
    ],
  },
  {
    id: '984e8e5d-0798-4748-a6bb-21e7d8829b4d',
    ordinal: 7,
    description: 'LAZER',
    costCenterSubs: [
      {
        id: '97794b58-01b9-4787-ab5a-03dd4c459b41',
        ordinal: 1,
        description: 'Cinema',
      },
      {
        id: 'd50259de-7723-4ef7-ac12-27ff1aa09ec7',
        ordinal: 2,
        description: 'Viagens',
      },
      {
        id: '397a6e47-b49e-4c7f-b32e-e9b9b3b3b729',
        ordinal: 3,
        description: 'Esportes',
      },
      {
        id: '04056fe0-8e9c-4e02-a67e-302c36e0b132',
        ordinal: 4,
        description: 'Equipamentos',
      },
      {
        id: 'c024ed4a-4932-4ac5-baca-19c477df5a44',
        ordinal: 5,
        description: 'Passeios',
      },
    ],
  },
  {
    id: '377942d0-f679-4808-8f8f-d72fbe7c25fc',
    ordinal: 8,
    description: 'EDUCACAO',
    costCenterSubs: [
      {
        id: 'cfdfbb25-d3d9-4ffd-be5f-5c0c876bcb00',
        ordinal: 1,
        description: 'Material escolar',
      },
      {
        id: 'e9f9dcee-d84b-4cdd-ac9f-f7a5058a13c0',
        ordinal: 2,
        description: 'Passeios',
      },
    ],
  },
  {
    id: 'ffc3effb-6633-444e-be5f-df728a0c16df',
    ordinal: 99,
    description: 'DIVERSOS',
    costCenterSubs: [
      {
        id: '41df66ff-8cd7-4779-b745-d84ce3d2b7e4',
        ordinal: 1,
        description: 'Presentes',
      },
      {
        id: '615610c1-89af-4eba-b19d-5c8cb91e7d56',
        ordinal: 2,
        description: 'Dízimo e ofertas',
      },
      {
        id: '5ccc1402-9a59-42fe-a4ea-5f8fe396deef',
        ordinal: 3,
        description: 'Outros',
      },
    ],
  },
];

@Injectable()
export class CountriesEffects {
  readonly store = inject(Store);

  constructor(private actions$: Actions) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(COUNTRIES_LOAD),
      mergeMap(() =>
        of(countries).pipe(map((items) => COUNTRIES_LOAD_SUCCESS({ items })))
      )
    )
  );
}

export const COUNTRIES_REDUCER = createReducer(
  INITIAL_STATE,
  //immerOn(COUNTRIES_LOAD_SUCCESS, (CURRENT_STATE, { items }) => {
  //  CURRENT_STATE.countries.items = items;
  //})
);
