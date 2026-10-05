import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  PoTableColumn,
  PoTableComponent,
  PoTableModule,
  PoPageModule,
  PoTagType,
  PoTableColumnLabel,
  PoTableSearchAiField,
  PoPageAction,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [CommonModule, PoTableModule, PoPageModule],
  templateUrl: './customers-table.component.html',
})
export class CustomersTableComponent {
  @ViewChild('customersTable', { static: true }) customersTable!: PoTableComponent;

  /** Ações da página (botão Novo Cliente) */
  readonly pageActions: Array<PoPageAction> = [
    {
      label: 'Novo Cliente',
      icon: 'an an-plus',
      action: () => this.router.navigate(['/customers/new']),
    },
  ];

  constructor(private router: Router) {}

  /** URL da API REST que retorna os registros paginados */
  readonly serviceApi = 'https://po-sample-api.onrender.com/v1/people';

  /** URL do endpoint proxy de IA para busca em linguagem natural */
  readonly searchAiUrl = 'https://po-sample-api.onrender.com/v1/ai/filter';

  /** Configuração do po-search-ai integrado à tabela */
  readonly searchAiField: PoTableSearchAiField = {
    url: this.searchAiUrl,
    placeholder: 'Pesquise em linguagem natural. Ex: "clientes ativos de SP"',
    apply: 'server',
    minConfidence: 0.6,
    timeout: 15000,
  };

  /** Labels customizados para a coluna de status (badges) */
  readonly statusLabels: Array<PoTableColumnLabel> = [
    {
      value: 'active',
      label: 'Ativo',
      type: PoTagType.Success,
      icon: true,
      tooltip: 'Cliente com cadastro ativo',
    },
    {
      value: 'inactive',
      label: 'Inativo',
      type: PoTagType.Danger,
      icon: true,
      tooltip: 'Cliente com cadastro inativo',
    },
    {
      value: 'pending',
      label: 'Pendente',
      type: PoTagType.Warning,
      icon: true,
      tooltip: 'Aguardando aprovação',
    },
    {
      value: 'blocked',
      label: 'Bloqueado',
      type: PoTagType.Neutral,
      icon: true,
      tooltip: 'Cliente bloqueado',
    },
  ];

  /** Definição das colunas da tabela */
  readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      width: '80px',
      sortable: true,
    },
    {
      property: 'name',
      label: 'Nome',
      sortable: true,
    },
    {
      property: 'email',
      label: 'E-mail',
      sortable: true,
    },
    {
      property: 'city',
      label: 'Cidade',
      sortable: true,
    },
    {
      property: 'status',
      label: 'Status',
      type: 'label',
      width: '140px',
      labels: this.statusLabels,
      sortable: true,
    },
  ];

  /** Flag de loading para o botão "Carregar mais" */
  isLoadingMore = false;

  /** Flag para desabilitar o botão "Carregar mais" quando não há mais dados */
  showMoreDisabled = false;

  /** Indica se há mais páginas disponíveis */
  hasNext = true;

  /** Página atual (controle interno) */
  private page = 1;

  /** Tamanho da página */
  private readonly pageSize = 10;

  /**
   * Evento disparado ao clicar em "Carregar mais resultados".
   * A paginação é controlada pelo p-service-api automaticamente,
   * mas este handler pode ser usado para lógica adicional.
   */
  onShowMore(): void {
    this.page++;
    this.isLoadingMore = true;
  }

  /**
   * Evento disparado ao ordenar uma coluna.
   * Com p-service-api, a ordenação é enviada automaticamente ao servidor
   * via query param (order). Este handler pode ser usado para lógica adicional.
   */
  onSortBy(event: any): void {
    console.log(`Ordenando por: ${event.column?.property} - ${event.type}`);
  }

  /**
   * Evento disparado quando a busca por IA retorna um resultado válido.
   */
  onSearchAiResult(result: any): void {
    console.log('Filtro IA aplicado:', result.filter);
    console.log('Descrição:', result.description);
    console.log('Confiança:', result.confidence);
  }

  /**
   * Evento disparado quando a busca por IA retorna baixa confiança.
   */
  onSearchAiLowConfidence(result: any): void {
    console.warn('Baixa confiança na busca IA:', result);
  }

  /**
   * Evento disparado quando ocorre erro na busca por IA.
   */
  onSearchAiError(error: any): void {
    console.error('Erro na busca por IA:', error);
  }
}
