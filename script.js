function toggleCode(elementId) {
    const element = document.getElementById(elementId);
    element.classList.toggle('hidden');
}

// Efecto de hover para las tarjetas
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Cambiar color de fondo de la tabla al hacer scroll
window.addEventListener('scroll', () => {
    const table = document.querySelector('table');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 300) {
        table.style.backgroundColor = '#363636';
    } else {
        table.style.backgroundColor = 'transparent';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.kanban-item');
    const columns = document.querySelectorAll('.kanban-items');

    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        const afterElement = getDragAfterElement(e.target.closest('.kanban-items'), e.clientY);
        
        if(afterElement) {
            e.target.closest('.kanban-items').insertBefore(draggable, afterElement);
        } else {
            e.target.closest('.kanban-items').appendChild(draggable);
        }
    }

    function getDragAfterElement(container, y) {
        return [...container.querySelectorAll('.kanban-item:not(.dragging)')]
            .reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                return offset < 0 && offset > closest.offset ? 
                    { offset: offset, element: child } : closest;
            }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
// Agregar un botón que redirija a una URL específica
const redirectButton = document.createElement('button');
redirectButton.textContent = 'Ir a propuesta';
redirectButton.style.position = 'fixed';
redirectButton.style.bottom = '20px';
redirectButton.style.right = '20px';
redirectButton.style.padding = '10px 20px';
redirectButton.style.backgroundColor = '#007BFF';
redirectButton.style.color = '#fff';
redirectButton.style.border = 'none';
redirectButton.style.borderRadius = '5px';
redirectButton.style.cursor = 'pointer';

redirectButton.addEventListener('click', () => {
    window.location.href = 'propuesta del sistema.html';
});

document.body.appendChild(redirectButton);

