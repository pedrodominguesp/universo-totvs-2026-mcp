import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  PoBreadcrumb,
  PoFieldModule,
  PoPageModule,
  PoNotificationService,
} from '@po-ui/ng-components';

interface Customer {
  id: number | null;
  name: string;
  email: string;
  city: string;
  status: boolean;
}

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PoFieldModule, PoPageModule],
  templateUrl: './customer-form.component.html',
})
export class CustomerFormComponent {
  /** Modelo do formulário */
  customer: Customer = {
    id: null,
    name: '',
    email: '',
    city: '',
    status: true,
  };

  /** Breadcrumb para navegação contextual */
  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Clientes', link: '/customers' },
      { label: 'Novo Cliente' },
    ],
  };

  constructor(
    private router: Router,
    private notification: PoNotificationService,
  ) {}

  /**
   * Ação do botão "Salvar".
   * Envia os dados e retorna para a listagem.
   */
  onSave(): void {
    this.saveCustomer();
    this.notification.success('Cliente salvo com sucesso!');
    this.router.navigate(['/customers']);
  }

  /**
   * Ação do botão "Salvar e Novo".
   * Envia os dados e limpa o formulário para um novo cadastro.
   */
  onSaveNew(): void {
    this.saveCustomer();
    this.notification.success('Cliente salvo com sucesso! Preencha um novo cadastro.');
    this.resetForm();
  }

  /**
   * Ação do botão "Cancelar".
   * Retorna para a listagem sem salvar.
   */
  onCancel(): void {
    this.router.navigate(['/customers']);
  }

  /**
   * Simula o envio dos dados ao servidor.
   * Substitua pela chamada real à API.
   */
  private saveCustomer(): void {
    const payload = {
      ...this.customer,
      status: this.customer.status ? 'active' : 'inactive',
    };
    console.log('Payload enviado:', payload);
  }

  /** Reseta o formulário para novo cadastro */
  private resetForm(): void {
    this.customer = {
      id: null,
      name: '',
      email: '',
      city: '',
      status: true,
    };
  }
}
